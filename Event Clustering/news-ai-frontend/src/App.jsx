import { useEffect, useState } from "react";
import { fetchEvents, fetchEventHeadlines } from "./api";
import "./index.css";

// The Magic Report Modal Component
function MagicModal({ onClose, event, headlines }) {
  // Generate a random vector simulation once when modal opens
  const simulatedVector = Array.from({ length: 120 }, () => (Math.random() * 2 - 1).toFixed(4));
  
  // Pick the first headline to analyze
  const sampleHeadline = headlines.length > 0 ? headlines[0].headline : "No headline available";
  const tokens = sampleHeadline.split(" ").map(w => w.replace(/[^a-zA-Z0-9]/g, ''));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Behind the Magic 🪄</h2>
          <p>How the AI processes: <strong>{event.event_name}</strong></p>
        </div>

        <div className="magic-grid">
          {/* Section 1: Raw Data Sample */}
          <div className="magic-card">
            <h3>1. Raw Data Input</h3>
            <p className="magic-desc">The AI ingests thousands of raw text headlines.</p>
            <ul className="sample-list">
              {headlines.slice(0, 5).map((hl, i) => (
                <li key={i}>{hl.headline}</li>
              ))}
            </ul>
          </div>

          {/* Section 2: Tokenization */}
          <div className="magic-card">
            <h3>2. Tokenization</h3>
            <p className="magic-desc">It breaks sentences into atomic pieces (Tokens) to understand structure.</p>
            <div className="token-container">
              {tokens.map((token, i) => (
                <span key={i} className="token-pill">{token}</span>
              ))}
            </div>
          </div>

          {/* Section 3: The Vector Space */}
          <div className="magic-card full-width">
            <h3>3. High-Dimensional Embeddings</h3>
            <p className="magic-desc">Raghuvaran converts the meaning of the words into a 384-dimensional mathematical space so it can group identical stories. Here is a visual simulation of the vector for this event:</p>
            <div className="vector-matrix">
              {simulatedVector.map((num, i) => (
                <span key={i} className={`vector-num ${parseFloat(num) > 0 ? 'positive' : 'negative'}`}>
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headlinesLoading, setHeadlinesLoading] = useState(false);
  
  // Modal State
  const [showMagicModal, setShowMagicModal] = useState(false);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setLoading(false);
      if (data.length > 0) {
        handleSelectEvent(data[0]);
      }
    }).catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, []);

  const handleSelectEvent = async (event) => {
    setSelectedEvent(event);
    setHeadlinesLoading(true);
    try {
      const data = await fetchEventHeadlines(event.cluster);
      setHeadlines(data.headlines);
    } catch (e) {
      console.error(e);
    } finally {
      setHeadlinesLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-screen"><div className="spinner"></div></div>;
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title-row">
            <h2>News Clusters</h2>
            <button 
              className="magic-btn" 
              onClick={() => setShowMagicModal(true)}
              title="See how the AI works!"
            >
              🪄 Report
            </button>
          </div>
          <span className="badge" title="Unique real-world events detected by the AI">
            {events.length} Detected
          </span>
        </div>
        <div className="event-list">
          {events.map((evt) => (
            <div 
              key={evt.cluster} 
              className={`event-card ${selectedEvent?.cluster === evt.cluster ? 'active' : ''}`}
              onClick={() => handleSelectEvent(evt)}
            >
              <div className="event-title">{evt.event_name}</div>
              <div className="event-meta">
                <span className="meta-pill">{evt.article_count} Articles</span>
                <span className="meta-date">{evt.start_date}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <a href="https://github.com/raghuvaranlokati" target="_blank" rel="noreferrer" className="profile-link" title="Raghuvaran Lokati">
            <img src="https://github.com/raghuvaranlokati.png" alt="Raghuvaran Lokati" className="profile-icon" />
          </a>
        </div>
        {selectedEvent ? (
          <>
            <header className="content-header">
              <h1>{selectedEvent.event_name}</h1>
              <p className="summary">{selectedEvent.event_summary}</p>
              <div className="stats-row">
                <div className="stat-pill">
                  <span className="stat-value">{selectedEvent.article_count}</span>
                  <span className="stat-label">Total Articles</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-value">{selectedEvent.start_date}</span>
                  <span className="stat-label">First Covered</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-value">{selectedEvent.end_date}</span>
                  <span className="stat-label">Most Recent</span>
                </div>
              </div>
            </header>

            <div className="headlines-container">
              <h2 className="section-title">Headline Timeline</h2>
              <div className="headlines-feed">
                {headlinesLoading ? (
                  <div className="spinner-wrapper"><div className="spinner"></div></div>
                ) : (
                  headlines.map((hl, i) => (
                    <article key={i} className="headline-item">
                      <div className="hl-date">{hl.date}</div>
                      <div className="hl-content">
                        <h3 className="hl-title">{hl.headline}</h3>
                        {hl.short_description && <p className="hl-desc">{hl.short_description}</p>}
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">Select an event to view headlines</div>
        )}
      </main>

      {/* Render the Modal if State is true */}
      {showMagicModal && selectedEvent && (
        <MagicModal 
          onClose={() => setShowMagicModal(false)} 
          event={selectedEvent} 
          headlines={headlines} 
        />
      )}
    </div>
  );
}

export default App;
