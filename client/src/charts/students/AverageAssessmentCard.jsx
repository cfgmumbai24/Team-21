import React from 'react';

const AverageAssessmentCard = () => {
  console.log("hello")
  // Hard-coded data for average assessment score
  const averageAssessmentScore = {
    title: 'Average Assessment Score',
    averageScore: 88,
  };

  return (
    <div className="card">
      <h3>{averageAssessmentScore.title}</h3>
      <p><strong>Average Score:</strong> {averageAssessmentScore.averageScore}</p>
    </div>
  );
};

export default AverageAssessmentCard;
