from flask import Flask, render_template, request
import sqlite3
import pandas as pd
from model import compute_similarity  # Import the new model
import preprocess  # Import the preprocessing module
import nltk

app = Flask(__name__)

# Define the home route
@app.route('/')
def home():
    return render_template('home.html')

def get_jobs():
    conn = sqlite3.connect('database.db')
    jobs = pd.read_sql_query("SELECT * FROM job_descriptions", conn)
    conn.close()
    return jobs

@app.route('/hr_dashboard')
def hr_dashboard():
    jobs = get_jobs()
    return render_template('hr_dashboard.html', jobs=jobs)

@app.route('/view_results/<int:job_id>')
def view_results(job_id):
    data = preprocess.preprocess_data('resumes_and_jobs.csv')
    job_descriptions = data['processed_job_descriptions'].tolist()
    resumes = data['processed_resumes'].tolist()
    similarity_matrix = compute_similarity(job_descriptions, resumes)
    rankings = similarity_matrix[job_id - 1]
    return render_template('view_results.html', job_id=job_id, rankings=rankings)

if __name__ == '__main__':
    nltk.download('stopwords')
    nltk.download('punkt')
    app.run(debug=True)
