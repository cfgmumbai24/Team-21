import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    navigate('/studentProfile');
  };

  const handleMentorClick = () => {
    navigate('/mentorProfile');
  };

  return (
    <Container maxWidth="sm">
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Select Your Role
        </Typography>
        <Box my={2}>
          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            onClick={handleStudentClick}
            style={{ 
              fontSize: '1.5rem', 
              padding: '20px', 
              backgroundColor: '#57321A', 
              color: 'white' 
            }}
          >
            Student
          </Button>
        </Box>
        <Box my={2}>
          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            onClick={handleMentorClick}
            style={{ 
              fontSize: '1.5rem', 
              padding: '20px', 
              backgroundColor: '#57321A', 
              color: 'white' 
            }}
          >
            Mentor
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Role;