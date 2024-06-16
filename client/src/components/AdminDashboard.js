import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AttendanceReport from '../charts/admin/AttendaceReport';
import Barchart from '../charts/admin/Barchart';
import GroupBarChart from '../charts/admin/GroupedBarChart';
import MentorPerformance from '../charts/admin/MentorPerformance';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance Report
              </Typography>
              <AttendanceReport />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bar Chart
              </Typography>
              <Barchart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Group Bar Chart
              </Typography>
              <GroupBarChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mentor Performance
              </Typography>
              <MentorPerformance />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
