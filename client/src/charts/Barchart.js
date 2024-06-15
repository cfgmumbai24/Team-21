import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = () => {
  // Example data (replace with your actual data source)
  const assessments = ['CLAT', 'CUET', 'Social Sciences', 'Design & Arts'];
  const averageScores = [75, 82, 68, 89]; // Example average scores for each assessment

  const data = [
    {
      x: assessments,
      y: averageScores,
      type: 'bar',
      marker: {
        color: '#3182bd', // Custom color for the bars
      },
    },
  ];

  const layout = {
    title: 'Average Test Scores per Assessments',
    xaxis: {
      title: 'Assessments',
    },
    yaxis: {
      title: 'Average Score',
    },
  };

  return <Plot data={data} layout={layout} />;
};

export default BarChart;
