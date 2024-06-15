import React from 'react';

const meetings = ["2024-06-20", "2024-06-22", "2024-06-25"];

const UpcomingMeetings = () => {
  return (
    <div className="upcoming-meetings">
      <h2>Upcoming Meetings</h2>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index}>{meeting}</li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingMeetings;
