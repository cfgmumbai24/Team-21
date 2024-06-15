import React from 'react';

const feedback = ["Good progress", "Needs improvement", "Excellent"];

const Feedback = () => {
  return (
    <div className="feedback">
      <h2>Feedback</h2>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
