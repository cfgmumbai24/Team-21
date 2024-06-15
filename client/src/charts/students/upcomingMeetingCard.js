import React from 'react';

const UpcomingMeetingCard = () => {
  // Hard-coded data for upcoming meeting
  const upcomingMeeting = {
    title: 'Upcoming Meeting',
    mentorName: 'John Doe',
    time: '10:00 AM - 11:00 AM',
  };

  return (
    <div className="card">
      <h3>{upcomingMeeting.title}</h3>
      <p><strong>Mentor:</strong> {upcomingMeeting.mentorName}</p>
      <p><strong>Time:</strong> {upcomingMeeting.time}</p>
    </div>
  );
};

export default UpcomingMeetingCard;
