import React from 'react';
import NavBar from './Siderbar/NavBar';
import SidebarComponent from './Siderbar/Sidebar';
import scholarships from './Siderbar/ScholarshipData';

function ScholarShip() {
  const mainContainerStyle = {
    display: 'flex',
  };

  const contentContainerStyle = {
    marginLeft: '80px', // Adjust based on the width of the sidebar
    padding: '16px',
    flex: '1',
  };

  const cardStyle = {
    height: '18rem',
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
    backgroundColor: '#57321A', // Updated background color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '16px',
    textDecoration: 'none',
  };

  const Card = ({ title, content }) => (
    <div style={cardStyle}>
      <div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={contentStyle}>{content}</p>
      </div>
      <a href="https://mahadbt.maharashtra.gov.in/Home/Index" style={buttonStyle}>Apply Now</a>
    </div>
  );

  return (
    <div>
      <NavBar />
      <div style={mainContainerStyle}>
        <SidebarComponent />
        <div style={contentContainerStyle}>
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
        </div>
      </div>
    </div>
  );
}

export default ScholarShip;