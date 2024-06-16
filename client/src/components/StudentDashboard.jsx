import React from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import AverageAssessmentCard from '../charts/students/AverageAssessmentCard';
import UpcomingMeetingCard from '../charts/students/upcomingMeetingCard';
import RecentAssessmentCard from '../charts/students/recentAssessmentCard';
import ScholarshipTable from '../charts/students/ScholarshipTable';
import FeedbackPieChart from '../charts/students/FeedbackPieChart';
import LineChart from '../charts/students/LineChart';

const StudentDashboard = () => {
  return (
    <Card sx={{ maxWidth: 1200, margin: 'auto', mt: 5, p: 2, backgroundColor: '#f5f5f5' }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* First row: three components */}
          <Grid item xs={12} md={4}>
            <AverageAssessmentCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentAssessmentCard />
          </Grid>
          <Grid item xs={12} md={4}>
            <UpcomingMeetingCard />
          </Grid>

          {/* Second row: two components */}
          <Grid item xs={12} md={6}>
            <FeedbackPieChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <LineChart />
          </Grid>

          {/* Third row: one component */}
          <Grid item xs={12}>
            <ScholarshipTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;
