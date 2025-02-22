from sklearn.metrics.pairwise import cosine_similarity
import preprocess

def train_model(file_path):
    data = preprocess.preprocess_data(file_path)
    resume_vectors, job_vectors = preprocess.vectorize_text(data)
    similarity_matrix = cosine_similarity(resume_vectors, job_vectors)
    return similarity_matrix

if __name__ == "__main__":
    file_path = 'resumes_and_jobs.csv'
    similarity_matrix = train_model(file_path)
    print(similarity_matrix)
