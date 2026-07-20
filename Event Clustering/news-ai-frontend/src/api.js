const API_BASE = "http://localhost:8000/api";

export async function fetchEvents() {
    const res = await fetch(`${API_BASE}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
}

export async function fetchEventHeadlines(clusterId) {
    const res = await fetch(`${API_BASE}/events/${clusterId}/headlines`);
    if (!res.ok) throw new Error("Failed to fetch headlines");
    return res.json();
}
