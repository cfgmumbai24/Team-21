import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = () => {
  // Hard-coded data for assessment score and time spent
  const assessmentScoreData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    scores: [80, 85, 90, 88, 92],
  };

  const timeSpentData = {
    dates: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    timeSpent: [30, 28, 35, 32, 36],
  };

  return (
    <div className="chart-container">
      <h2>Assessment Score and Time Spent</h2>
      <Plot
        data={[
          {
            x: assessmentScoreData.dates,
            y: assessmentScoreData.scores,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Assessment Score',
            marker: { color: 'blue' },
          },
          {
            x: timeSpentData.dates,
            y: timeSpentData.timeSpent,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Time Spent (hrs)',
            marker: { color: 'green' },
            yaxis: 'y2',
          },
        ]}
        layout={{
          xaxis: { title: 'Months' },
          yaxis: { title: 'Assessment Score', range: [70, 100] },
          yaxis2: {
            title: 'Time Spent (hrs)',
            overlaying: 'y',
            side: 'right',
            range: [20, 40],
          },
        }}
      />
    </div>
  );
};

export default LineChart;
