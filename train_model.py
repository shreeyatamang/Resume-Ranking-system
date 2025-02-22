import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

def train_model():
    try:
        # Load your dataset
        data = pd.read_csv('path/to/your/dataset.csv')
        
        # Preprocess the data
        texts = data['text']
        labels = data['label']
        
        # Vectorize the text data
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform(texts)
        
        # Train the model
        model = LogisticRegression()
        model.fit(X, labels)
        
        # Save the model and vectorizer
        joblib.dump(model, 'models/trained_model.pkl')
        joblib.dump(vectorizer, 'models/vectorizer.pkl')
        print("Model and vectorizer saved successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    train_model()
