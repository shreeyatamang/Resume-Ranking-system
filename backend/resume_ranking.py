import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import sqlite3

nltk.download('stopwords')
nltk.download('wordnet')

# Preprocess text
def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    tokens = nltk.word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token.isalnum() and token not in stop_words]
    return ' '.join(tokens)

# Load dataset from database
def load_data():
    conn = sqlite3.connect('database.db')
    job_descriptions = pd.read_sql_query("SELECT * FROM job_descriptions", conn)
    resumes = pd.read_sql_query("SELECT * FROM resumes", conn)
    conn.close()
    return job_descriptions, resumes

# Calculate rankings
def calculate_rankings():
    job_descriptions, resumes = load_data()

    # Preprocess job descriptions and resumes
    job_descriptions['processed'] = job_descriptions['description'].apply(preprocess_text)
    resumes['processed'] = resumes['resume'].apply(preprocess_text)

    # Feature extraction using TF-IDF
    vectorizer = TfidfVectorizer()
    job_tfidf = vectorizer.fit_transform(job_descriptions['processed'])
    resume_tfidf = vectorizer.transform(resumes['processed'])

    # Calculate similarity
    similarity_matrix = cosine_similarity(resume_tfidf, job_tfidf)

    # Rank resumes for each job
    rankings = []
    for i in range(similarity_matrix.shape[1]):
        job_similarities = similarity_matrix[:, i]
        ranked_indices = job_similarities.argsort()[::-1]
        rankings.append([(idx, similarity_matrix[idx, i]) for idx in ranked_indices])

    return rankings

rankings = calculate_rankings()
