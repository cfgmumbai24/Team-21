import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import Feedback from '../charts/mentor/Feedback';
import StudentFeedbackPieChart from '../charts/students/FeedbackPieChart';
import StudentList from '../charts/mentor/StudentList';
import UpcomingMeetings from '../charts/mentor/UpcomingMeetings';

const MentorDashboard = () => {
  return (
    <div className="dashboard-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Feedback
              </Typography>
              <Feedback />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Feedback Pie Chart
              </Typography>
              <StudentFeedbackPieChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student List
              </Typography>
              <StudentList />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Meetings
              </Typography>
              <UpcomingMeetings />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MentorDashboard;
