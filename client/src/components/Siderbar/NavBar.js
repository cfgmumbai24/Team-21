// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import GoogleTranslate from '../GoogleTranslate';

const Tabs = styled(Link)`
  margin-left: 20px;
  font-size: 20px;
  text-decoration: none;
  color: white; /* Text color */
  &:hover {
    color: white; /* Change color on hover */
  }
`;

function NavBar() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#57321A' }}> {/* Background color */}
        <Toolbar>
          <Tabs to="/">EKLAVYA</Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <GoogleTranslate />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
