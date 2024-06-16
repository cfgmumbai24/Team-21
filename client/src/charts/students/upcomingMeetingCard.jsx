import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UpcomingMeetingCard = () => {
  // Hard-coded data for upcoming meeting
  const upcomingMeeting = {
    title: 'Upcoming Meeting',
    mentorName: 'John Doe',
    time: '10:00 AM - 11:00 AM',
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {upcomingMeeting.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Mentor: {upcomingMeeting.mentorName}
        </Typography>
        <Typography color="textSecondary">
          Time: {upcomingMeeting.time}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingCard;
