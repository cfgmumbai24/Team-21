import React from 'react';

function ScholarShip() {
  const cardStyle = {
    height: '16rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    flex: '1',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'auto', // To handle overflow content
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px',
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  };

  const contentStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.5',
  };

  const buttonStyle = {
    alignSelf: 'flex-end',
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '16px',
    textDecoration: 'none',
  };

  const scholarships = [
    {
      title: 'Maharashtra State Scholarship for Students of Minority Communities',
      content: 'This scholarship is for students belonging to minority communities to pursue higher education.',
    },
    {
      title: 'Rajarshi Chhatrapati Shahu Maharaj Merit Scholarship',
      content: 'This scholarship is awarded to meritorious students from economically weaker sections.',
    },
    {
      title: 'Eklavya Scholarship',
      content: 'Eklavya Scholarship is for postgraduate students with a first-class degree in arts, science, or commerce.',
    },
    {
      title: 'Maharashtra State Government Open Merit Scholarship',
      content: 'This scholarship is for students who have secured 60% or more in their HSC exams.',
    },
    {
      title: 'Post-Matric Scholarship for SBC Students, Maharashtra',
      content: 'This scholarship is for students from the Special Backward Classes (SBC) pursuing post-matric education.',
    },
    {
      title: 'Dr. Panjabrao Deshmukh Vasatigruh Nirvah Bhatta Yojna',
      content: 'This scheme provides hostel fees and maintenance allowances to economically backward students.',
    },
  ];

  const Card = ({ title, content }) => (
    <div style={cardStyle}>
      <div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={contentStyle}>{content}</p>
      </div>
      <a href="#" style={buttonStyle}>Apply Now</a>
    </div>
  );

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {scholarships.slice(0, 3).map((scholarship, index) => (
          <Card key={index} title={scholarship.title} content={scholarship.content} />
        ))}
      </div>
      <div style={containerStyle}>
        {scholarships.slice(3, 6).map((scholarship, index) => (
          <Card key={index} title={scholarship.title} content={scholarship.content} />
        ))}
      </div>
    </div>
  );
}

export default ScholarShip;
