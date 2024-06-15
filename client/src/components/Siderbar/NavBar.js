import React from 'react';
import { AppBar, Toolbar, styled } from '@mui/material';
import { Link } from 'react-router-dom';

function NavBar() {
  const Tabs = styled(Link)`
    margin-left: 20px;
    font-size: 20px;
    text-decoration: none;
    color: white /* Text color */
    &:hover {
      color: white; /* Change color on hover */
    }
  `;

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#57321A' }}> {/* Background color */}
        <Toolbar>
          <Tabs to="/">EKLAVYA</Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
