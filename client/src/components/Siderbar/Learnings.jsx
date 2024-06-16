import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import SidebarComponent from './Sidebar';
import NavBar from './NavBar';
import subjects from './LearningData';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


const Learning = () => {
  const [subject, setSubject] = useState([]);
  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get('/courses');
      const fetchedSubjects = response.data.courses;
      setSubject(fetchedSubjects);
      const initialCheckedState = fetchedSubjects.map(subject => new Array(subject.videos.length).fill(false));
      setCheckedState(initialCheckedState);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };


  const initialCheckedState = subjects.map(subject => new Array(subject.videos.length).fill(false));
  const [checkedState, setCheckedState] = useState(initialCheckedState);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState('');

  const handleCheckboxChange = (subjectIndex, videoIndex) => {
    const updatedCheckedState = checkedState.map((subject, idx) =>
      idx === subjectIndex
        ? subject.map((item, vidIdx) => (vidIdx === videoIndex ? !item : item))
        : subject
    );
    setCheckedState(updatedCheckedState);
  };

  const calculateProgress = (subjectCheckedState) => {
    const checkedCount = subjectCheckedState.filter(Boolean).length;
    return (checkedCount / subjectCheckedState.length) * 100;
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={0}>
          <SidebarComponent />
        </Grid>
        <Grid item xs={9}>
          <Container maxWidth="md">
            <Box textAlign="center" my={4}>
              <Typography variant="h4" gutterBottom>
                Course Tracker
              </Typography>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="subject-select-label">Select Subject</InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={selectedSubjectIndex}
                  onChange={(e) => setSelectedSubjectIndex(e.target.value)}
                  label="Select Subject"
                >
                  {subjects.map((subject, index) => (
                    <MenuItem value={index} key={subject.name}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedSubjectIndex !== '' && (
                <Box my={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {subjects[selectedSubjectIndex].name}
                      </Typography>
                      <Box my={2}>
                        <LinearProgress
                          variant="determinate"
                          value={calculateProgress(checkedState[selectedSubjectIndex])}
                        />
                        <Typography variant="body1" mt={2}>
                          Progress: {Math.round(calculateProgress(checkedState[selectedSubjectIndex]))}%
                        </Typography>
                      </Box>
                      <List>
                        {subjects[selectedSubjectIndex].videos.map((video, videoIndex) => (
                          <ListItem key={video.id}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkedState[selectedSubjectIndex][videoIndex]}
                                  onChange={() => handleCheckboxChange(selectedSubjectIndex, videoIndex)}
                                  color="primary"
                                />
                              }
                              label={
                                <ListItemText
                                  primary={video.label}
                                  secondary={<a href={video.link} target="_blank" rel="noopener noreferrer">Watch</a>}
                                />
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Learning;