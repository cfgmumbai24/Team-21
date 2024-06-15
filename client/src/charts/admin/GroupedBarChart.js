import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const GroupedBarChart = () => {
  const [selectedAssessment, setSelectedAssessment] = useState('CLAT'); // Initial selected assessment area
  const [collegeScores, setCollegeScores] = useState([]); // State to store scores for selected assessment area

  // Example data (replace with your actual data source)
  const assessmentAreas = ['CLAT', 'CUET', 'Social Sciences', 'Design & Arts'];
  const colleges = ['College A', 'College B', 'College C'];
  const admissionData = {
    'CLAT': ['College A', 'College B'],
    'CUET': ['College B', 'College C'],
    'Social Sciences': ['College A', 'College C'],
    'Design & Arts': ['College A', 'College B', 'College C'],
  };

  // Effect to update college scores when assessment area changes
  useEffect(() => {
    if (admissionData[selectedAssessment]) {
      const scores = admissionData[selectedAssessment].map(college => ({
        college: college,
        score: Math.floor(Math.random() * 100) + 1, // Example random score, replace with actual data
      }));
      setCollegeScores(scores);
    } else {
      setCollegeScores([]);
    }
  }, [selectedAssessment]);

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    setSelectedAssessment(event.target.value);
  };

  // Data for Plotly grouped bar chart
  const data = [{
    x: collegeScores.map(entry => entry.score),
    y: collegeScores.map(entry => entry.college),
    type: 'bar',
    orientation: 'h',
  }];

  const layout = {
    title: `Average Scores for Colleges in ${selectedAssessment}`,
    yaxis: { title: 'Colleges' },
    xaxis: { title: 'Average Score' },
  };

  return (
    <div>
      <h2>Grouped Bar Chart with Dropdown</h2>
      <div>
        <label htmlFor="assessment-select">Select Assessment Area:</label>
        <select id="assessment-select" value={selectedAssessment} onChange={handleDropdownChange}>
          {assessmentAreas.map((assessment) => (
            <option key={assessment} value={assessment}>
              {assessment}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Plot data={data} layout={layout} />
      </div>
    </div>
  );
};

export default GroupedBarChart;
