# 🧠 NLP Mastery Repository

Welcome to the **NLP Mastery Repository**! This repository showcases advanced Natural Language Processing (NLP) techniques, focusing purely on four major, highly-engineered projects. 

Below is a step-by-step breakdown of exactly what was accomplished in each of these four core areas.

---

## 1. 🚀 Event Clustering
**Goal:** Automatically group thousands of random news articles into distinct real-world "events" and serve them via a full-stack web application.

*   **Step 1: Text Cleaning** — Built a pipeline to strip out messy punctuation, special characters, and anomalies from raw headlines.
*   **Step 2: Semantic Embeddings** — Deployed `SentenceTransformer` to convert English headlines into 384-dimensional mathematical arrays so the computer could understand the "meaning" of the text rather than just the raw letters.
*   **Step 3: Dimensionality Reduction (UMAP)** — Compressed the high-dimensional embeddings down to a manageable size while preserving the core semantic distance between articles.
*   **Step 4: Density Clustering (HDBSCAN)** — Elegantly grouped the compressed points into dense clumps, representing specific real-world events, while automatically filtering out unrelated "noise" articles.
*   **Step 5: Event Naming (c-TF-IDF)** — Extracted the most important keywords from each cluster to automatically generate titles for the events.
*   **Step 6: Backend Engineering (FastAPI)** — Built a lightning-fast Python API to serve the clustered JSON data over the internet.
*   **Step 7: Frontend Engineering (React)** — Designed a beautiful, dark-mode React dashboard to visualize the events, complete with timeline views.

---

## 2. 🧠 RNN (Recurrent Neural Networks)
**Goal:** Build a robust deep learning model for Sentiment Analysis that actually learns English instead of memorizing a small training dataset.

*   **Step 1: The Overfitting Problem** — Trained a basic `SimpleRNN` on a tiny 1,000-row dataset, proving that simple models just memorize data and fail on unseen text.
*   **Step 2: Advanced Architecture** — Upgraded the model to use **Bidirectional LSTMs** to read text forwards and backwards.
*   **Step 3: Heavy Regularization** — Injected Spatial `Dropout1D`, Recurrent Dropout, and Dense Dropout to forcefully prevent the AI from memorizing the data.
*   **Step 4: PyTorch Migration** — Rewrote the training loop in pure PyTorch and debugged a critical tensor alignment issue by implementing **Pre-Padding** (ensuring the final hidden state didn't land on a zero-pad token).
*   **Step 5: The "Out of Vocabulary" Bug** — Discovered the model failed on simple words like "good" because they literally didn't exist in the 1,000-row training set.
*   **Step 6: Transfer Learning Fix** — Solved the vocabulary problem by importing a massive pre-trained Google Brain (`nnlm-en-dim50`) via TensorFlow Hub, fine-tuning its Dense layers to perfectly understand our specific definitions of sentiment.

---

## 3. 🤖 LSTM (Next Word Predictor)
**Goal:** Push a standard Next-Word Prediction LSTM to its absolute theoretical limits to prevent mode collapse on a tiny FAQ dataset.

*   **Step 1: Dataset Tokenization** — Processed the FAQ dataset using HuggingFace's Byte-Pair Encoding (BPE) to completely eliminate OOV errors at the sub-word level.
*   **Step 2: AWD-LSTM Implementation** — Engineered a custom PyTorch class that uses DropConnect on the hidden-to-hidden recurrent weights, preventing overfitting without destroying the RNN's memory stream.
*   **Step 3: Breaking the Bottleneck (MoS)** — Integrated a **Mixture of Softmaxes** layer. Instead of predicting one word, the model generates multiple potential probability distributions and dynamically weighs them, solving the traditional softmax bottleneck.
*   **Step 4: Continuous Neural Cache** — Engineered a custom inference loop with a rolling cache pointer. This acts as short-term photographic memory, allowing the model to dynamically copy words it literally just saw in the prompt context to ensure logical coherence.
*   **Step 5: Advanced Training Techniques** — Trained the model using `OneCycleLR`, Label Smoothing, and Gradient Clipping to guarantee convergence.

---

## 4. 📊 Sentiment Analysis
**Goal:** Build an ultra-fast, highly interpretable Machine Learning pipeline for sentiment classification using traditional Tree-based models.

*   **Step 1: Load the Data** — Imported the dataset and prepared the text columns.
*   **Step 2: Keyword Feature Extraction** — Applied `TF-IDF` (Term Frequency-Inverse Document Frequency) to mathematically map the importance of specific keywords across the documents.
*   **Step 3: Semantic Embeddings** — Used GPU-accelerated models to extract deep semantic embeddings from the text.
*   **Step 4: Feature Fusion** — Combined the traditional TF-IDF keyword matrices with the dense semantic embeddings to create a master dataset containing both explicit keywords and implicit meaning.
*   **Step 5: Train/Test Split** — Segregated the data to prevent data leakage during training.
*   **Step 6: Random Forest Training** — Trained an ensemble of Decision Trees (Random Forest) on the fused features to classify sentiment.
*   **Step 7: Evaluation** — Evaluated the model by calculating training accuracy, testing accuracy, and generating a highly detailed Classification Report (Precision, Recall, and F1-Scores for every class).

---

## 👨‍💻 Author
**Created by Raghuvaran**  
