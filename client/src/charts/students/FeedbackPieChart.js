import React from 'react';
import Plot from 'react-plotly.js';

const FeedbackPieChart = () => {
  // Hard-coded data for feedback from mentors
  const feedbackData = {
    positive: 75,
    negative: 25,
  };

  return (
    <div className="chart-container">
      <h2>Feedback from Mentors</h2>
      <Plot
        data={[
          {
            labels: ['Positive', 'Negative'],
            values: [feedbackData.positive, feedbackData.negative],
            type: 'pie',
            marker: { colors: ['green', 'red'] },
            textinfo: 'label+percent',
            insidetextorientation: 'radial',
          },
        ]}
        layout={{ margin: { t: 0, b: 0 } }}
      />
    </div>
  );
};

export default FeedbackPieChart;
