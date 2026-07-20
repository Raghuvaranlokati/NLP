# Deep Learning Sentiment Analysis
**Author**: Raghuvaran
**GitHub**: [https://github.com/raghuvaranlokati](https://github.com/raghuvaranlokati)

This project demonstrates the complete evolution of a Sentiment Analysis model. We transformed a basic, overfitting neural network into a robust, state-of-the-art Transfer Learning pipeline using a custom 1,000-row dataset. 

Here is the step-by-step journey of everything we accomplished from start to finish:

## 1. The Initial Problem: Memorization (Overfitting)
We started with a basic TensorFlow/Keras `SimpleRNN`. However, because our dataset was extremely small (only 1,000 rows), the model simply memorized the exact sentences rather than learning the actual English language. It achieved a high training accuracy but completely failed to generalize to new, real-world sentences.

## 2. The Advanced Architecture Upgrade
To force the AI to learn the semantic meaning of words, we drastically overhauled the architecture:
- **Bidirectional LSTMs**: Instead of a simple RNN that forgets the beginning of a sentence, we used LSTMs to remember long-term context. We made it Bidirectional so the AI reads the sentence from left-to-right AND right-to-left. 
- **Heavy Regularization**: We added `Dropout1d` (Spatial Dropout), Recurrent Dropout, and Dense Dropout. This randomly disabled parts of the AI's brain during training, forcing it to generalize instead of memorize.
- **Early Stopping**: We added a callback (`EarlyStopping`) to automatically halt training when validation loss stopped improving, ensuring we saved the most generalized weights. We later fine-tuned this with a `min_delta` to stop when improvements became microscopic.

## 3. The PyTorch Migration & Debugging
To build a stronger engineering portfolio, we temporarily migrated the entire project to **pure PyTorch**.
- We built a custom pure Python vocabulary builder and a custom PyTorch training loop.
- **Debugging Mode Collapse**: We discovered a classic PyTorch bug where padding sequences at the *end* (post-padding) destroys the LSTM signal. We fixed this by switching to **Pre-Padding**, perfectly restoring the network's ability to learn.

## 4. The Final Boss: The "Out of Vocabulary" (OOV) Bug
Despite our best efforts in PyTorch, the model failed on edge-cases like `"product was good"`, returning neutral or random scores.
We ran an analysis on the dataset and discovered the core issue: **The word "good" didn't exist in the 1000-row dataset!**
Because the model had never seen words like "good", "best", or "worst", it couldn't possibly know what they meant.

## 5. The 1000% Fix: TensorFlow Hub Transfer Learning
To solve the OOV bug without needing millions of rows of data, we switched back to **TensorFlow** to utilize **TensorFlow Hub**.
Instead of building a baby AI from scratch, we imported a massive, pre-trained Google Brain (`nnlm-en-dim50`) that already fully understood the English dictionary.
- We used `hub.KerasLayer` to import the brain in one line of code.
- We fine-tuned the Dense layers on our 1,000-row dataset to teach it our specific definitions of Positive and Negative.
- **Result**: The model effortlessly predicted the sentiment of unseen words like "best", "worst", and "good" because the pre-trained embedding already knew their semantic meaning!

## 6. Environment and Notebook Polish
We encountered and resolved several intense local environment bugs to make this notebook flawless:
- **The `pkg_resources` Bug**: Modern Python environments deleted `pkg_resources`, breaking `tensorflow_hub`. We fixed this by explicitly restricting `setuptools<70` in our pip installations.
- **The Keras 3 Bug**: Modern TensorFlow defaults to Keras 3, which crashes older Hub models. We fixed this by installing `tf-keras` and injecting the `TF_USE_LEGACY_KERAS="1"` environment variable before loading TensorFlow.
- **The PyArrow Pandas 3.0 Bug**: Pandas 3.0 uses PyArrow for strings, which crashes `scikit-learn` splits. We mathematically fixed this by forcing the dataframe columns into standard Python lists before converting to NumPy arrays.
- **Notebook Granularity**: We split the final testing block into individual, cleanly separated cells so each prediction runs independently, providing a beautiful user experience.

---
