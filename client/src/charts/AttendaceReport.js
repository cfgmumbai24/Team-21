import React from 'react';
import PieChart from './piechart'; // Adjust the path as per your project structure

const AttendanceReport = () => {
  const attendedCount = 80;
  const notAttendedCount = 20;

  return (
    <div>
      <h2>Attendance Report</h2>
      <PieChart attended={attendedCount} notAttended={notAttendedCount} />
    </div>
  );
};

export default AttendanceReport;
