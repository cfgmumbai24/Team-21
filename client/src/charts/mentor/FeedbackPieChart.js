import React from 'react';
import Plot from 'react-plotly.js';

const feedbackData = {
  labels: ["Positive", "Neutral", "Negative"],
  values: [10, 5, 2]
};

const FeedbackPieChart = () => {
  return (
    <div className="feedback-pie-chart">
      <h2>Feedback Overview</h2>
      <Plot
        data={[
          {
            values: feedbackData.values,
            labels: feedbackData.labels,
            type: 'pie',
          },
        ]}
        layout={{ width: 400, height: 400, title: 'Feedback' }}
      />
    </div>
  );
};

export default FeedbackPieChart;
