from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

# MongoDB client setup
client = MongoClient('mongodb+srv://authentication:admin123@message.ddc2vqd.mongodb.net/?retryWrites=true&w=majority&appName=message')
db = client['message']
mentors_collection = db['mentors']
students_collection = db['students']

@app.route('/api/create', methods=['POST'])
def assign_mentor():
    data = request.json
    print(data)
    student_id = data['_id']
    print(type(data))
    print(student_id)
    if not student_id:
        return jsonify({'error': 'No student_id provided'}), 400

    try:
        student_object_id = ObjectId(student_id)
    except:
        return jsonify({'error': 'Invalid student_id format'}), 400

    # Fetch student data
    student = students_collection.find_one({'_id': student_object_id})
    if not student:
        return jsonify({'error': 'Student not found'}), 404

    # Fetch mentor data
    mentors = list(mentors_collection.find({}))

    if not mentors:
        return jsonify({'error': 'No mentors available'}), 404

    # Convert data to DataFrame
    df_students = pd.DataFrame([student])
    df_mentors = pd.DataFrame(mentors)

    # Similar process as described in your example
    all_interests = set(sum(df_students['interests'].tolist(), []) + sum(df_mentors['subject'].tolist(), []))
    all_skills = set(sum(df_students['skills'].tolist(), []))
    all_languages = set(df_students['language'].tolist())
    all_state_districts = set(df_students['state_district'].tolist() + df_mentors['state_district'].tolist())

    mlb_interests = MultiLabelBinarizer()
    mlb_skills = MultiLabelBinarizer()
    mlb_languages = MultiLabelBinarizer()
    mlb_state_district = MultiLabelBinarizer()

    mlb_interests.fit([list(all_interests)])
    mlb_skills.fit([list(all_skills)])
    mlb_languages.fit([list(all_languages)])
    mlb_state_district.fit([list(all_state_districts)])

    student_interests_encoded = mlb_interests.transform(df_students['interests'])
    student_skills_encoded = mlb_skills.transform(df_students['skills'])
    student_languages_encoded = mlb_languages.transform(df_students['language'].apply(lambda x: [x]))
    student_state_district_encoded = mlb_state_district.transform(df_students['state_district'].apply(lambda x: [x]))

    mentor_subjects_encoded = mlb_interests.transform(df_mentors['subject'])
    mentor_state_district_encoded = mlb_state_district.transform(df_mentors['state_district'].apply(lambda x: [x]))
    mentor_languages_encoded = mlb_languages.transform(df_mentors['language'].apply(lambda x: [x]))

    student_features = np.hstack((student_interests_encoded, student_languages_encoded, student_state_district_encoded))
    mentor_features = np.hstack((mentor_subjects_encoded, mentor_languages_encoded, mentor_state_district_encoded))

    similarity_matrix = cosine_similarity(student_features, mentor_features)

    student_skills_matrix = mlb_skills.transform(df_students['skills'])
    mentor_skills_matrix = np.zeros((len(df_mentors), student_skills_matrix.shape[1]))

    skill_similarity_matrix = cosine_similarity(student_skills_matrix, mentor_skills_matrix)

    combined_similarity = 0.7 * similarity_matrix + 0.3 * skill_similarity_matrix

    mentor_student_count = {mentor['_id']: 0 for mentor in mentors}
    assignments = {str(student['_id']): None for student in [student]}

    for student_idx in range(combined_similarity.shape[0]):
        student_id = df_students.iloc[student_idx]['_id']
        mentor_similarities = combined_similarity[student_idx]
        sorted_mentors = np.argsort(-mentor_similarities)

        for mentor_idx in sorted_mentors:
            mentor_id = df_mentors.iloc[mentor_idx]['_id']
            if mentor_student_count[mentor_id] < 10:
                assignments[str(student_id)] = str(mentor_id)
                mentor_student_count[mentor_id] += 1
                break

    assigned_mentor_id = assignments[str(student['_id'])]
    student['mentor_id'] = ObjectId(assigned_mentor_id)
    students_collection.update_one({'_id': student_object_id}, {'$set': student})

    return jsonify({'student_id': str(student_object_id), 'mentor_id': assigned_mentor_id})

if __name__ == '__main__':
    app.run(debug=True)
