import React from 'react';
import SidebarComponent from './Sidebar';
import NavBar from './NavBar';

const Calendar = () => {
  const mainContainerStyle = {
    display: 'flex',
  };

  const contentContainerStyle = {
    marginLeft: '80px', // Adjust based on the width of the sidebar
    padding: '16px',
    flex: '1',
  };

  return (
    <div>
      <NavBar/>
    <div style={mainContainerStyle}>
      <SidebarComponent />
      <div style={contentContainerStyle}>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=aartimishra1209%40gmail.com&ctz=Asia%2FKolkata"
          style={{ border: '0' }}
          width="800"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
    </div>
  );
};

export default Calendar;
