# Advanced LSTM Next Word Predictor

This project implements a highly advanced Recurrent Neural Network for Next Word Prediction, pushing the boundaries of standard LSTMs on small datasets.

## Architecture Highlights
- **AWD-LSTM (ASGD Weight-Dropped LSTM):** Uses DropConnect on hidden-to-hidden recurrent weights to prevent overfitting without disrupting the memory stream.
- **Mixture of Softmaxes (MoS):** Breaks the traditional softmax bottleneck to represent highly complex language distributions.
- **Continuous Neural Cache Pointer:** Grants the model a short-term "photographic memory" to copy words directly from recent context during inference.
- **BPE Tokenization:** Uses HuggingFace's Byte-Pair Encoding tokenizer to eliminate Out-Of-Vocabulary (OOV) errors.
- **PyTorch Invariants:** Properly implements pre-padding to ensure accurate final hidden state extraction.

## Requirements
To run this notebook, you need to install the required dependencies. Run the following code in the first cell of your Jupyter Notebook:

```python
import sys
!{sys.executable} -m pip install torch tokenizers
```

### Why do we use this specific installation command?
In Jupyter Notebooks, simply running `!pip install torch` can sometimes install the package into the wrong Python environment (e.g., your global computer environment rather than the specific environment your notebook is currently using). 

By importing `sys` and using `sys.executable`, we get the exact absolute path to the Python engine that is actively running the current notebook. Using `!{sys.executable} -m pip install` guarantees that `torch` and `tokenizers` are installed exactly where the notebook can see them. This completely prevents the dreaded `ModuleNotFoundError` that commonly occurs in Jupyter.

## Author
**Raghuvaran**
