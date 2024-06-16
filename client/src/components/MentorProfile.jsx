import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Siderbar/NavBar';
import SidebarMentor from './Siderbar/SidebarMentor';

const MentorProfile = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mentor/test.doe@example.com');
        console.log(response);
        setMentor(response.data.mentor); // Accessing the 'mentor' property from the response
      } catch (error) {
        console.error('Error fetching mentor:', error);
      }
    };

    fetchMentor();
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex' }}>
        <SidebarMentor />
        <div className="mentor-profile" style={{ padding: '20px' }}>
          {mentor ? (
            <div className="profile-details">
              <div className="profile-section">
                <p><strong>Name:</strong> {mentor.name}</p>
                <p><strong>Email:</strong> {mentor.email}</p>
                <p><strong>Mobile:</strong> {mentor.mobile}</p>
              </div>
              <div className="profile-section">
                <h3>Skills & Interests</h3>
                <p><strong>Skills:</strong> {mentor.skills.join(', ')}</p>
                <p><strong>Interest Areas:</strong> {mentor.interest_areas.join(', ')}</p>
              </div>
              <div className="profile-section">
                <h3>Education & Location</h3>
                <p><strong>College:</strong> {mentor.college}</p>
                <p><strong>District:</strong> {mentor.district}</p>
                <p><strong>State:</strong> {mentor.state}</p>
              </div>
              <div className="profile-section">
                <h3>Languages</h3>
                <p><strong>Proficient Languages:</strong> {mentor.proficient_languages.length > 0 ? mentor.proficient_languages.join(', ') : 'N/A'}</p>
              </div>
              <div className="profile-section">
                <h3>Load & Students</h3>
                <p><strong>Max Load:</strong> {mentor.max_load}</p>
                <p><strong>Students Assigned:</strong> {mentor.students_assigned.length > 0 ? mentor.students_assigned.join(', ') : 'None'}</p>
              </div>
              <div className="profile-section">
                <h3>Account Information</h3>
                <p><strong>Created At:</strong> {new Date(mentor.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(mentor.updatedAt).toLocaleString()}</p>
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

export default MentorProfile;
