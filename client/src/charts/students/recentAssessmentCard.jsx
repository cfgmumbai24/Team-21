import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RecentAssessmentCard = () => {
  // Hard-coded data for recent assessment score
  const recentAssessmentScore = {
    title: 'Recent Assessment Score',
    score: 92,
    assessmentType: 'CLAT',
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {recentAssessmentScore.title}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Score: {recentAssessmentScore.score}
        </Typography>
        <Typography variant="body2" component="p">
          Assessment Type: {recentAssessmentScore.assessmentType}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecentAssessmentCard;
