import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import SidebarComponent from '../Siderbar/Sidebar';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/student/jane.doe@example.com');
        setStudent(response.data.student); // Accessing the 'student' property from the response
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex' }}>
        <SidebarComponent />
        <div className="student-profile">
          <h1>Student Profile</h1>
          {student ? (
            <div className="profile-details">
              <div className="profile-section">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Age:</strong> {student.age}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Mobile:</strong> {student.mobile}</p>
                <p><strong>Community:</strong> {student.community}</p>
              </div>
              <div className="profile-section">
                <h3>Education</h3>
                <p><strong>Education Level:</strong> {student.education_level}</p>
                <p><strong>District:</strong> {student.district}</p>
                <p><strong>State:</strong> {student.state}</p>
                <p><strong>Income Certificate:</strong> {student.income_certificate}</p>
                <p><strong>Proficient Languages:</strong> {student.proficient_languages.join(', ')}</p>
              </div>
              <div className="profile-section">
                <h3>Academic</h3>
                <p><strong>Attendance:</strong> {student.attendance}%</p>
                <p><strong>Courses Enrolled:</strong> {student.courses_enrolled.join(', ')}</p>
                <div>
                  <strong>Assessments:</strong>
                  {student.assessments.map(assessment => (
                    <div key={assessment._id}>
                      <p><strong>Assessment ID:</strong> {assessment._id}</p>
                      <p><strong>Score:</strong> {assessment.score}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="profile-section">
                <h3>Mentor & Scholarships</h3>
                <p><strong>Mentor ID:</strong> {student.mentor_id}</p>
                <p><strong>Scholarships:</strong> {student.scholarships.join(', ')}</p>
              </div>
              <div className="profile-section">
                <h3>Account Information</h3>
                <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
