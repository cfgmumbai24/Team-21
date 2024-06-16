import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardActions,
  Container,
} from '@mui/material';
import NavBar from './NavBar';
import SidebarMentor from './SidebarMentor';

const students = [
  { id: 1, name: 'Sharil Malik' },
  { id: 2, name: 'Aarti ' },
  { id: 3, name: 'Adesh' },
  { id: 4, name: 'Niloy' },
  { id: 5, name: 'Marayda' },
  { id: 6, name: 'Divya' },
  { id: 7, name: 'Aikshet' },
  
];

const FeedbackForm = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      studentId: selectedStudent,
      feedback: feedback,
    };

    try {
      const response = await axios.post('/api/feedback', data);
      console.log('Feedback submitted:', response.data);
      setSelectedStudent('');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <SidebarMentor />
        <Container>
          <Card sx={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Submit Feedback
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  select
                  label="Select Student"
                  value={selectedStudent}
                  onChange={handleStudentChange}
                  fullWidth
                  required
                  margin="normal"
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Feedback"
                  value={feedback}
                  onChange={handleFeedbackChange}
                  fullWidth
                  required
                  margin="normal"
                  multiline
                  rows={4}
                />
                <CardActions>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default FeedbackForm;
