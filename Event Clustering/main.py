import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(title="Event Clustering API")

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = Path(__file__).parent.parent / "Data" / "Event_Clustering" / "Processed_Events.csv"

def load_data():
    if not DATA_PATH.exists():
        raise HTTPException(status_code=404, detail="Processed_Events.csv not found")
    df = pd.read_csv(DATA_PATH, encoding="utf-8")
    df["date"] = pd.to_datetime(df["date"]).dt.strftime("%Y-%m-%d")
    return df

@app.get("/api/events")
def get_events():
    df = load_data()
    # Build event catalog
    catalog = (
        df.groupby(["cluster", "event_name", "event_summary"], as_index=False)
        .agg(
            article_count=("headline", "count"),
            start_date=("date", "min"),
            end_date=("date", "max"),
        )
        .sort_values("article_count", ascending=False)
        .reset_index(drop=True)
    )
    # Convert to list of dicts
    return catalog.to_dict(orient="records")

@app.get("/api/events/{cluster_id}/headlines")
def get_headlines(cluster_id: int):
    df = load_data()
    event_df = df[df["cluster"] == cluster_id]
    if event_df.empty:
        raise HTTPException(status_code=404, detail="Cluster not found")
    
    event_df = event_df.sort_values("date", ascending=False)
    headlines = event_df[["date", "headline", "short_description"]].to_dict(orient="records")
    return {"cluster_id": cluster_id, "headlines": headlines}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
