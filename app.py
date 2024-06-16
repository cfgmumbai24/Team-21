import streamlit as st
import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


# Load data from JSON file
with open('data.json', 'r') as f:
    data = json.load(f)

students = data['students']
mentors = data['mentors']
assignments = data.get('assignments', {})

student_id_counter = max(student['student_id'] for student in students) + 1
mentor_id_counter = max(mentor['mentor_id'] for mentor in mentors) + 1

# Function to add a new student
def add_student(name, language, interests, skills, state_district):
    global student_id_counter
    student = {
        'student_id': student_id_counter,
        'name': name,
        'language': language,
        'interests': interests,
        'skills': skills,
        'state_district': state_district
    }
    students.append(student)
    student_id_counter += 1

# Function to add a new mentor
def add_mentor(name, subject, language, state_district):
    global mentor_id_counter
    mentor = {
        'mentor_id': mentor_id_counter,
        'name': name,
        'subject': subject,
        'language': language,
        'state_district': state_district
    }
    mentors.append(mentor)
    mentor_id_counter += 1

# Function to update a student
def update_student(student_id, name, language, interests, skills, state_district):
    for student in students:
        if student['student_id'] == student_id:
            student['name'] = name
            student['language'] = language
            student['interests'] = interests
            student['skills'] = skills
            student['state_district'] = state_district
            break

# Function to update a mentor
def update_mentor(mentor_id, name, subject, language, state_district):
    for mentor in mentors:
        if mentor['mentor_id'] == mentor_id:
            mentor['name'] = name
            mentor['subject'] = subject
            mentor['language'] = language
            mentor['state_district'] = state_district
            break

# Function to delete a student
def delete_student(student_id):
    global students
    students = [student for student in students if student['student_id'] != student_id]

# Function to delete a mentor
def delete_mentor(mentor_id):
    global mentors
    mentors = [mentor for mentor in mentors if mentor['mentor_id'] != mentor_id]
    
# Function to perform sentiment analysis
def perform_sentiment_analysis(text):
    sentiment_scores = analyzer.polarity_scores(text)
    return sentiment_scores['compound']

# Function to map attendance percentage to 1-5 scale
def map_attendance_to_scale(attendance_percentage):
    return round(attendance_percentage / 20)

# Function to map score percentage to 1-5 scale
def map_score_to_scale(score_percentage):
    return round(score_percentage / 20)

# Function to calculate final rating out of 5 based on sentiment, attendance, and score
def calculate_final_rating(sentiment_score, attendance_percentage, score_percentage):
    attendance_rating = map_attendance_to_scale(attendance_percentage)
    score_rating = map_score_to_scale(score_percentage)
    
    # Adjust sentiment score directly into the final rating calculation
    final_rating = (sentiment_score + attendance_rating + score_rating) / 3
    return round(final_rating, 1)

# Sidebar with vertical tabs
st.sidebar.title("Navigation")
tabs = st.sidebar.radio("Select a page:", ["Home", "Add Student", "Add Mentor", "View/Update Students", "View/Update Mentors", "Rating", "Feedback"])

st.sidebar.header("Adjust Weights for Similarity Calculation")
# Sliders for weights (normalized)
interests_weight = st.sidebar.slider("Interests Weight", 0.0, 1.0, 0.7)
skills_weight = 1.0 - interests_weight  # Calculate skills weight based on interests weight

st.sidebar.markdown(f"Skills Weight: {skills_weight}")

# Initialize sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

# Function to perform sentiment analysis
def perform_sentiment_analysis(text):
    sentiment_scores = analyzer.polarity_scores(text)
    return sentiment_scores['compound']

# Function to map sentiment score to 1-5 scale
def map_sentiment_score_to_scale(score):
    if score <= -0.5:
        return 1
    elif score <= 0:
        return 2
    elif score == 0:
        return 3
    elif score < 0.5:
        return 4
    else:
        return 5

# Function to map attendance percentage to 1-5 scale
def map_attendance_to_scale(attendance_percentage):
    return round(attendance_percentage / 20)

# Function to map score percentage to 1-5 scale
def map_score_to_scale(score_percentage):
    return round(score_percentage / 20)

# Function to calculate final rating out of 5
def calculate_final_rating(sentiment_score, attendance_percentage, score_percentage):
    sentiment_rating = map_sentiment_score_to_scale(sentiment_score)
    attendance_rating = map_attendance_to_scale(attendance_percentage)
    score_rating = map_score_to_scale(score_percentage)
    
    final_rating = (sentiment_rating + attendance_rating + score_rating) / 3
    return round(final_rating, 1)  # Round to one decimal place

if tabs == "Home":
    st.title("Student and Mentor Assignment System")
    
    if students and mentors:
        st.header("Assignments")

        # Combine all unique classes for interests, skills, languages, state_district
        all_interests = set(sum([s['interests'] for s in students], []) + sum([m['subject'] for m in mentors], []))
        all_skills = set(sum([s['skills'] for s in students], []))
        all_languages = set([s['language'] for s in students])
        all_state_districts = set([s['state_district'] for s in students] + [m['state_district'] for m in mentors])

        # Initialize MultiLabelBinarizers with all possible classes
        mlb_interests = MultiLabelBinarizer()
        mlb_skills = MultiLabelBinarizer()
        mlb_languages = MultiLabelBinarizer()
        mlb_state_district = MultiLabelBinarizer()

        # Fit MultiLabelBinarizers on combined sets
        mlb_interests.fit([list(all_interests)])
        mlb_skills.fit([list(all_skills)])
        mlb_languages.fit([list(all_languages)])
        mlb_state_district.fit([list(all_state_districts)])

        # Transform interests, skills, languages for students
        student_interests_encoded = mlb_interests.transform([s['interests'] for s in students])
        student_skills_encoded = mlb_skills.transform([s['skills'] for s in students])
        student_languages_encoded = mlb_languages.transform([[s['language']] for s in students])
        student_state_district_encoded = mlb_state_district.transform([[s['state_district']] for s in students])

        # Transform subjects for mentors
        mentor_subjects_encoded = mlb_interests.transform([m['subject'] for m in mentors])
        mentor_state_district_encoded = mlb_state_district.transform([[m['state_district']] for m in mentors])
        mentor_languages_encoded = mlb_languages.transform([[m['language']] for m in mentors])

        # Combine all features for students and mentors, except skills
        student_features = np.hstack((student_interests_encoded, student_languages_encoded, student_state_district_encoded))
        mentor_features = np.hstack((mentor_subjects_encoded, mentor_languages_encoded, mentor_state_district_encoded))

        # Calculate similarity matrix for non-skills features
        similarity_matrix = cosine_similarity(student_features, mentor_features)

        # Calculate similarity matrix for skills
        student_skills_matrix = mlb_skills.transform([s['skills'] for s in students])
        mentor_skills_matrix = np.zeros((len(mentors), student_skills_matrix.shape[1]))  # Mentors don't have skills, so all zeros

        # Calculate skill similarity separately
        skill_similarity_matrix = cosine_similarity(student_skills_matrix, mentor_skills_matrix)

        # Combine both similarity matrices with weighting from the sidebar
        combined_similarity = interests_weight * similarity_matrix + skills_weight * skill_similarity_matrix

        # Initialize assignment structures
        mentor_student_count = {mentor['mentor_id']: 0 for mentor in mentors}
        assignments = {student['student_id']: None for student in students}

        # Assign students based on similarity
        for student_idx in range(combined_similarity.shape[0]):
            student_id = students[student_idx]['student_id']
            mentor_similarities = combined_similarity[student_idx]
            sorted_mentors = np.argsort(-mentor_similarities)

            for mentor_idx in sorted_mentors:
                mentor_id = mentors[mentor_idx]['mentor_id']
                if mentor_student_count[mentor_id] < 10:
                    assignments[student_id] = mentor_id
                    mentor_student_count[mentor_id] += 1
                    break

        # Display assignments
        assignments_df = pd.DataFrame(list(assignments.items()), columns=['Student ID', 'Mentor ID'])
        st.dataframe(assignments_df)

        # Display mentor student counts
        st.header("Mentor Student Counts")
        mentor_student_count_df = pd.DataFrame(list(mentor_student_count.items()), columns=['Mentor ID', 'Student Count'])
        st.dataframe(mentor_student_count_df)

        # Save assignments to a JSON file
        if st.button("Save Assignments to JSON"):
            with open('assignments.json', 'w') as f:
                json.dump(assignments, f)
            st.write("Assignments saved to assignments.json")
    else:
        st.write("No students or mentors added yet")

if tabs == "Add Student":
    st.header("Add Student")
    student_name = st.text_input("Student Name")
    student_language = st.selectbox("Student Language", ['Hindi', 'Tamil', 'Bengali', 'Kannada', 'Marathi', 'Telugu', 'Punjabi', 'Gujarati', 'Odia', 'Assamese', 'Malayalam', 'Urdu', 'Sanskrit'])
    student_interests = st.multiselect("Student Interests", ['math', 'science', 'art', 'biology', 'painting', 'physics', 'geometry'])
    student_skills = st.multiselect("Student Skills", ['algebra', 'biology', 'painting', 'geometry', 'physics'])
    student_state_district = st.selectbox("Student State District", ['MH_Mumbai', 'DL_Delhi', 'KA_Bangalore', 'TN_Chennai', 'WB_Kolkata', 'MH_Pune', 'AP_Hyderabad', 'PB_Ludhiana', 'GJ_Ahmedabad', 'OD_Bhubaneswar', 'AS_Guwahati', 'KL_Kochi', 'KA_Mysore', 'UP_Lucknow', 'RJ_Jaipur', 'MH_Nagpur', 'TN_Coimbatore', 'KA_Belgaum', 'UP_Kanpur', 'MP_Indore'])

    if st.button("Add Student"):
        add_student(student_name, student_language, student_interests, student_skills, student_state_district)
        st.success("Student added successfully")

if tabs == "Add Mentor":
    st.header("Add Mentor")
    mentor_name = st.text_input("Mentor Name")
    mentor_subject = st.multiselect("Mentor Subject", ['math', 'science', 'art'])
    mentor_language = st.selectbox("Mentor Language", ['Hindi', 'Tamil', 'Bengali', 'Kannada'])
    mentor_state_district = st.selectbox("Mentor State District", ['KA_Bangalore', 'MH_Mumbai', 'DL_Delhi', 'MH_Pune', 'AP_Hyderabad'])

    if st.button("Add Mentor"):
        add_mentor(mentor_name, mentor_subject, mentor_language, mentor_state_district)
        st.success("Mentor added successfully")

if tabs == "View/Update Students":
    st.header("View/Update Students")
    if students:
        df_students = pd.DataFrame(students)
        st.dataframe(df_students)
        selected_student_id = st.selectbox("Select Student to Update/Delete", df_students['student_id'])

        if selected_student_id:
            selected_student = next(student for student in students if student['student_id'] == selected_student_id)
            st.text_input("Student Name", value=selected_student['name'], key="update_student_name")
            st.selectbox("Student Language", ['Hindi', 'Tamil', 'Bengali', 'Kannada', 'Marathi', 'Telugu', 'Punjabi', 'Gujarati', 'Odia', 'Assamese', 'Malayalam', 'Urdu', 'Sanskrit'], index=['Hindi', 'Tamil', 'Bengali', 'Kannada', 'Marathi', 'Telugu', 'Punjabi', 'Gujarati', 'Odia', 'Assamese', 'Malayalam', 'Urdu', 'Sanskrit'].index(selected_student['language']), key="update_student_language")
            st.multiselect("Student Interests", ['math', 'science', 'art', 'biology', 'painting', 'physics', 'geometry'], default=selected_student['interests'], key="update_student_interests")
            st.multiselect("Student Skills", ['algebra', 'biology', 'painting', 'geometry', 'physics'], default=selected_student['skills'], key="update_student_skills")
            st.selectbox("Student State District", ['MH_Mumbai', 'DL_Delhi', 'KA_Bangalore', 'TN_Chennai', 'WB_Kolkata', 'MH_Pune', 'AP_Hyderabad', 'PB_Ludhiana', 'GJ_Ahmedabad', 'OD_Bhubaneswar', 'AS_Guwahati', 'KL_Kochi', 'KA_Mysore', 'UP_Lucknow', 'RJ_Jaipur', 'MH_Nagpur', 'TN_Coimbatore', 'KA_Belgaum', 'UP_Kanpur', 'MP_Indore'], index=['MH_Mumbai', 'DL_Delhi', 'KA_Bangalore', 'TN_Chennai', 'WB_Kolkata', 'MH_Pune', 'AP_Hyderabad', 'PB_Ludhiana', 'GJ_Ahmedabad', 'OD_Bhubaneswar', 'AS_Guwahati', 'KL_Kochi', 'KA_Mysore', 'UP_Lucknow', 'RJ_Jaipur', 'MH_Nagpur', 'TN_Coimbatore', 'KA_Belgaum', 'UP_Kanpur', 'MP_Indore'].index(selected_student['state_district']), key="update_student_state_district")

            if st.button("Update Student"):
                update_student(selected_student_id, st.session_state.update_student_name, st.session_state.update_student_language, st.session_state.update_student_interests, st.session_state.update_student_skills, st.session_state.update_student_state_district)
                st.success("Student updated successfully")
            
            if st.button("Delete Student"):
                delete_student(selected_student_id)
                st.success("Student deleted successfully")
    else:
        st.write("No students added yet")

if tabs == "View/Update Mentors":
    st.header("View/Update Mentors")
    if mentors:
        df_mentors = pd.DataFrame(mentors)
        st.dataframe(df_mentors)
        selected_mentor_id = st.selectbox("Select Mentor to Update/Delete", df_mentors['mentor_id'])

        if selected_mentor_id:
            selected_mentor = next(mentor for mentor in mentors if mentor['mentor_id'] == selected_mentor_id)
            st.text_input("Mentor Name", value=selected_mentor['name'], key="update_mentor_name")
            st.multiselect("Mentor Subject", ['math', 'science', 'art'], default=selected_mentor['subject'], key="update_mentor_subject")
            st.selectbox("Mentor Language", ['Hindi', 'Tamil', 'Bengali', 'Kannada'], index=['Hindi', 'Tamil', 'Bengali', 'Kannada'].index(selected_mentor['language']), key="update_mentor_language")
            st.selectbox("Mentor State District", ['KA_Bangalore', 'MH_Mumbai', 'DL_Delhi', 'MH_Pune', 'AP_Hyderabad'], index=['KA_Bangalore', 'MH_Mumbai', 'DL_Delhi', 'MH_Pune', 'AP_Hyderabad'].index(selected_mentor['state_district']), key="update_mentor_state_district")

            if st.button("Update Mentor"):
                update_mentor(selected_mentor_id, st.session_state.update_mentor_name, st.session_state.update_mentor_subject, st.session_state.update_mentor_language, st.session_state.update_mentor_state_district)
                st.success("Mentor updated successfully")
            
            if st.button("Delete Mentor"):
                delete_mentor(selected_mentor_id)
                st.success("Mentor deleted successfully")
    else:
        st.write("No mentors added yet")

if tabs == "Feedback":
    st.header("Provide Feedback")
    # Input for feedback text
    feedback_text = st.text_area("Enter your feedback:")
    # Input for attendance percentage
    attendance_percentage = st.number_input("Enter your attendance percentage:", min_value=0.0, max_value=100.0, value=95.5)
    # Input for score percentage
    score_percentage = st.number_input("Enter your score percentage:", min_value=0.0, max_value=100.0, value=87.2)
    if st.button("Submit Feedback"):
        # Perform sentiment analysis on feedback
        sentiment_score = perform_sentiment_analysis(feedback_text)
        # Calculate final rating
        final_rating = calculate_final_rating(sentiment_score, attendance_percentage, score_percentage)
        # Display sentiment score and final rating
        st.subheader("Feedback Analysis")
        st.write(f"Feedback Sentiment Score: {sentiment_score}")
        st.write(f"Final Rating: {final_rating}/5")