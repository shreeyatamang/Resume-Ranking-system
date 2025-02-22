import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('db.sqlite3')
cursor = conn.cursor()

# Create job_descriptions table
cursor.execute('''
CREATE TABLE IF NOT EXISTS job_descriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title TEXT NOT NULL,
    job_description TEXT NOT NULL
)
''')

# Create resumes table (if needed)
cursor.execute('''
CREATE TABLE IF NOT EXISTS resumes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_name TEXT NOT NULL,
    resume_text TEXT NOT NULL
)
''')

# Commit the changes and close the connection
conn.commit()
conn.close()
