import React from 'react';
import Plot from 'react-plotly.js';

const PieChart = ({ attended, notAttended }) => {
  const data = [
    {
      labels: ['Attended', 'Not Attended'],
      values: [attended, notAttended],
      type: 'pie',
      marker: {
        colors: ['#66c2a5', '#fc8d62'], // Custom colors for 'Attended' and 'Not Attended'
      },
    },
  ];

  const layout = {
    title: 'Attendance Status',
  };

  return <Plot data={data} layout={layout} />;
};

export default PieChart;
