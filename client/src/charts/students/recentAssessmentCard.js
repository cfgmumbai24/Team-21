import React from 'react';

const RecentAssessmentCard = () => {
  // Hard-coded data for recent assessment score
  const recentAssessmentScore = {
    title: 'Recent Assessment Score',
    score: 92,
    assessmentType: 'CLAT',
  };

  return (
    <div className="card">
      <h3>{recentAssessmentScore.title}</h3>
      <p><strong>Score:</strong> {recentAssessmentScore.score}</p>
      <p><strong>Assessment Type:</strong> {recentAssessmentScore.assessmentType}</p>
    </div>
  );
};

export default RecentAssessmentCard;
