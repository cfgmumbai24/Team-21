import React from 'react';

const students = ["Student A", "Student B", "Student C", "Student D", "Student E"];

const StudentList = () => {
  return (
    <div className="student-list">
      <h2>Student List</h2>
      <div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
        {students.map((student, index) => (
          <p key={index}>{student}</p>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
