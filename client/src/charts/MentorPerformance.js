import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const MentorPerformanceChart = () => {
  // Example data (replace with actual data source)
  const mentors = ['Mentor A', 'Mentor B', 'Mentor C', 'Mentor D'];
  const ratingsData = {
    'Mentor A': [
      { date: '2023-01-01', strong: 8, weak: 3 },
      { date: '2023-02-01', strong: 7, weak: 5 },
      { date: '2023-03-01', strong: 9, weak: 2 },
      { date: '2023-04-01', strong: 8, weak: 4 },
    ],
    'Mentor B': [
      { date: '2023-01-01', strong: 7, weak: 4 },
      { date: '2023-02-01', strong: 6, weak: 3 },
      { date: '2023-03-01', strong: 8, weak: 5 },
      { date: '2023-04-01', strong: 9, weak: 2 },
    ],
    'Mentor C': [
      { date: '2023-01-01', strong: 9, weak: 2 },
      { date: '2023-02-01', strong: 8, weak: 3 },
      { date: '2023-03-01', strong: 7, weak: 4 },
      { date: '2023-04-01', strong: 8, weak: 3 },
    ],
    'Mentor D': [
      { date: '2023-01-01', strong: 8, weak: 3 },
      { date: '2023-02-01', strong: 9, weak: 2 },
      { date: '2023-03-01', strong: 8, weak: 4 },
      { date: '2023-04-01', strong: 7, weak: 5 },
    ],
  };

  const [selectedMentor, setSelectedMentor] = useState(mentors[0]); // Initial selected mentor
  const [selectedTimeSpan, setSelectedTimeSpan] = useState('monthly'); // Initial selected time span
  const [data, setData] = useState([]);

  useEffect(() => {
    updateChartData(selectedMentor, selectedTimeSpan);
  }, [selectedMentor, selectedTimeSpan]);

  const updateChartData = (mentor, timeSpan) => {
    const mentorData = ratingsData[mentor];
    let filteredData = [];

    switch (timeSpan) {
      case 'monthly':
        filteredData = mentorData;
        break;
      case 'quarterly':
        filteredData = getQuarterlyData(mentorData);
        break;
      default:
        filteredData = mentorData;
        break;
    }

    const strongRatings = filteredData.map(entry => entry.strong);
    const weakRatings = filteredData.map(entry => entry.weak);
    const dates = filteredData.map(entry => entry.date);

    setData([
      {
        x: dates,
        y: strongRatings,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'lines',
        name: 'Strong Ratings',
        line: { color: 'green' },
      },
      {
        x: dates,
        y: weakRatings,
        fill: 'tozeroy',
        type: 'scatter',
        mode: 'lines',
        name: 'Weak Ratings',
        line: { color: 'red' },
      },
    ]);
  };

  const getQuarterlyData = (data) => {
    // Function to aggregate data into quarterly intervals
    const quarterlyData = [];
    let quarter = null;
    let quarterSum = { strong: 0, weak: 0 };
    let quarterCount = 0;

    for (let i = 0; i < data.length; i++) {
      const currentDate = new Date(data[i].date);
      const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;

      if (quarter === null || currentQuarter !== quarter) {
        if (quarter !== null) {
          quarterlyData.push({
            date: `${quarterSum.year}-Q${quarter}`,
            strong: quarterSum.strong / quarterCount,
            weak: quarterSum.weak / quarterCount,
          });
        }
        quarter = currentQuarter;
        quarterSum = { strong: 0, weak: 0 };
        quarterCount = 0;
      }

      quarterSum.strong += data[i].strong;
      quarterSum.weak += data[i].weak;
      quarterCount++;
    }

    if (quarter !== null) {
      quarterlyData.push({
        date: `${quarterSum.year}-Q${quarter}`,
        strong: quarterSum.strong / quarterCount,
        weak: quarterSum.weak / quarterCount,
      });
    }

    return quarterlyData;
  };

  const handleMentorChange = (event) => {
    setSelectedMentor(event.target.value);
  };

  const handleTimeSpanChange = (event) => {
    setSelectedTimeSpan(event.target.value);
  };

  const layout = {
    title: `Performance Feedback Over ${selectedTimeSpan} for ${selectedMentor}`,
    yaxis: { title: 'Rating' },
    xaxis: { title: 'Date' },
  };

  return (
    <div>
      <h2>Mentor Performance Feedback Over Time</h2>
      <div>
        <label htmlFor="mentor-select">Select Mentor:</label>
        <select id="mentor-select" value={selectedMentor} onChange={handleMentorChange}>
          {mentors.map((mentor) => (
            <option key={mentor} value={mentor}>
              {mentor}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="time-span-select">Select Time Span:</label>
        <select id="time-span-select" value={selectedTimeSpan} onChange={handleTimeSpanChange}>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Plot data={data} layout={layout} />
      </div>
    </div>
  );
};

export default MentorPerformanceChart;
