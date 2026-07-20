# News AI: Event Clustering Project

Hey there! Welcome to the Event Clustering project. If you're looking at this and wondering what all these files do, don't worry—I'm going to break it down step-by-step so it makes complete sense, even if you're totally new to machine learning.

Basically, the goal of this project is to take a massive pile of random news articles and automatically group them together into specific real-world "events" (like grouping all the articles about the 2012 Olympics, or a specific election).

Here is exactly how we built it and how it works.

## Step 1: The Dataset
We started with a huge dataset of news articles called the **News Category Dataset v3**. You can find the original dataset online (it's often hosted on Kaggle). It contains hundreds of thousands of news headlines, short descriptions, dates, and categories. 

For our project, we only care about the text itself—specifically the headlines and the short descriptions.

*Note: You can find this raw data inside the `Data/Event_Clustering/` folder, saved as `News_Category_Dataset_v3.json`.*

## Step 2: The Machine Learning Pipeline
All the heavy lifting happens inside the `1_News_Clustering_Pipeline.ipynb` Jupyter Notebook. If you run that notebook from top to bottom, here is what it's actually doing behind the scenes:

1. **Cleaning the Text**: Real-world data is messy. First, we run the news articles through a cleaning script (`pipeline_utils.py`) to strip out weird punctuation, extra spaces, and special characters so our AI doesn't get confused.
2. **Understanding the Text (Embeddings)**: Computers don't read English, they read numbers. We use a powerful AI tool called `SentenceTransformer` to read every single cleaned headline and convert its "meaning" into a long list of numbers (called an embedding). Articles with similar meanings get similar numbers.
3. **Compressing the Data (UMAP)**: Those lists of numbers are huge and hard to work with. We use an algorithm called UMAP to compress them down into a much smaller, manageable size while keeping the core meaning intact.
4. **Grouping the Events (HDBSCAN)**: Now that our articles are compressed into little data points, we use a clustering algorithm called HDBSCAN. It looks for tight clumps of data points and groups them together. Each clump represents a specific news event!
5. **Naming the Events (c-TF-IDF)**: Finally, we need to know what each group is actually about. We run a specialized keyword extractor that scans the grouped articles and automatically generates a title for the event based on the most common, unique words used.

When the notebook is finished, it spits out all the answers into a nice, clean file called `Processed_Events.csv` (which is also saved in the `Data/Event_Clustering/` folder).

## Step 3: The Web App
Looking at a CSV file isn't very fun, so we built a custom web application to visualize the results! 

The web app is split into two small parts that talk to each other:

**1. The Backend (FastAPI)**
We created a lightning-fast Python server (`main.py`). Its only job is to read our final `Processed_Events.csv` file and send that data to the internet so our frontend can read it. 

**2. The Frontend (React)**
Inside the `news-ai-frontend` folder is a custom-designed React application. It connects to our Python backend, grabs the data, and displays it in a beautiful, dark-mode dashboard where you can click on different events and read the original headlines.

---

## How to Run the Project Yourself

Want to see it in action? You don't need to run the machine learning notebook again unless you want to generate new data. You just need to start the web app!

You'll need to open two separate terminal windows.

**Terminal 1 (Start the Backend):**
Make sure you are in the main `Event Clustering` folder, and type:
```bash
python main.py
```
*(This starts the Python server on port 8000)*

**Terminal 2 (Start the Frontend):**
Navigate into the frontend folder and start the UI:
```bash
cd news-ai-frontend
npm run dev
```
*(This starts the web server on port 5173)*

Now just open your web browser and go to `http://localhost:5173`. You're done!

---

## Challenges, Design Decisions & Improvements

To build this pipeline, several technical decisions were made:

*   **Design Decision (Embeddings vs TF-IDF):** I chose `SentenceTransformer` embeddings over basic TF-IDF because TF-IDF struggles with synonyms and context. Embeddings capture the deep semantic meaning of headlines, allowing us to cluster articles that use different words to describe the same event.
*   **Design Decision (HDBSCAN over KMeans):** We used HDBSCAN for clustering because we don't know how many real-world events exist in the data beforehand. KMeans requires you to guess the number of clusters (`k`), whereas HDBSCAN finds dense groups automatically and elegantly filters out "noise" (unrelated articles).
*   **Challenge Faced (The Formatting Glitch):** Initially, the aggressive text cleaning required for the AI stripped away all punctuation and capitalization, making the final dashboard look messy. I had to engineer a solution to maintain a "clean" copy of the text for the AI models while preserving a "raw" copy for the human-facing UI.
*   **Future Improvements:** Currently, the event summaries are template-based. A future improvement would be to integrate a lightweight local LLM (like Llama-3) to read the headlines in a cluster and generate a highly readable, human-like paragraph summarizing the actual timeline of the event.

---

## Author
**Created by Raghuvaran**  
GitHub: [raghuvaranlokati](https://github.com/raghuvaranlokati)
