from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import nltk
import re
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download NLTK resources
nltk.download('stopwords')
nltk.download('punkt')

app = Flask(__name__)

# Load the dataset
file_path = "accounts/FinalCleanedResumeDataSet.csv"
df = pd.read_csv(file_path)

# Function to preprocess text
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return ' '.join(tokens)

def rank_resumes(resume_texts, job_description):
    all_texts = [job_description] + resume_texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    return np.argsort(similarities[0])[::-1]  # Sort resumes by relevance

# ...existing code...

def calculate_rank(job_desc, resumes):
    processed_resumes = [preprocess_text(resume) for resume in resumes]
    ranked_indices = rank_resumes(processed_resumes, job_desc)
    
    # Debugging: Print the ranked indices
    print("Ranked indices:", ranked_indices)
    
    ranked_resumes = [{"rank": i+1, "resume": resumes[idx]} for i, idx in enumerate(ranked_indices)]
    
    # Debugging: Print the ranked resumes
    print("Ranked resumes:", ranked_resumes)
    
    return ranked_resumes

# API Route for ranking resumes
@app.route('/rank', methods=['POST'])
def rank():
    data = request.get_json()
    job_desc = data.get('job_desc', '')
    resumes = data.get('resumes', [])

    if not job_desc or not resumes:
        return jsonify({'error': 'Missing job description or resumes'}), 400

    ranked_resumes = calculate_rank(job_desc, resumes)
    
    # Debugging: Print the final response
    print("Final response:", {'ranked_resumes': ranked_resumes})
    
    return jsonify({'ranked_resumes': ranked_resumes})

# ...existing code... 

if __name__ == '__main__':
    app.run(debug=True)