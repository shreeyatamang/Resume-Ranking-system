import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text)
    filtered_text = [w for w in word_tokens if not w.lower() in stop_words]
    return ' '.join(filtered_text)

def preprocess_data(file_path):
    data = pd.read_csv(file_path)
    vectorizer = TfidfVectorizer()
    job_descriptions = vectorizer.fit_transform(data['job_descriptions'])
    resumes = vectorizer.fit_transform(data['resumes'])
    return {
        'processed_job_descriptions': job_descriptions,
        'processed_resumes': resumes
    }

def vectorize_text(data):
    vectorizer = TfidfVectorizer()
    resume_vectors = vectorizer.fit_transform(data['processed_resumes'])
    job_vectors = vectorizer.transform(data['processed_job_descriptions'])
    return resume_vectors, job_vectors
