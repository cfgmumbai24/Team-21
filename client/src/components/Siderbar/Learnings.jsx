import React, { useState } from 'react';
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
  Grid
} from '@mui/material';

import SidebarComponent from './Sidebar';
import NavBar from './NavBar';

const subjects = [
  {
    name: 'Math',
    videos: [
      { id: 'math1', label: 'Math Video 1', link: 'https://www.youtube.com/watch?v=example1' },
      { id: 'math2', label: 'Math Video 2', link: 'https://www.youtube.com/watch?v=example2' },
      { id: 'math3', label: 'Math Video 3', link: 'https://www.youtube.com/watch?v=example3' },
    ],
  },
  {
    name: 'Science',
    videos: [
      { id: 'science1', label: 'Science Video 1', link: 'https://www.youtube.com/watch?v=example4' },
      { id: 'science2', label: 'Science Video 2', link: 'https://www.youtube.com/watch?v=example5' },
      { id: 'science3', label: 'Science Video 3', link: 'https://www.youtube.com/watch?v=example6' },
    ],
  },
  {
    name: 'History',
    videos: [
      { id: 'history1', label: 'History Video 1', link: 'https://www.youtube.com/watch?v=example7' },
      { id: 'history2', label: 'History Video 2', link: 'https://www.youtube.com/watch?v=example8' },
      { id: 'history3', label: 'History Video 3', link: 'https://www.youtube.com/watch?v=example9' },
    ],
  },
  {
    name: 'English',
    videos: [
      { id: 'english1', label: 'English Video 1', link: 'https://www.youtube.com/watch?v=example10' },
      { id: 'english2', label: 'English Video 2', link: 'https://www.youtube.com/watch?v=example11' },
      { id: 'english3', label: 'English Video 3', link: 'https://www.youtube.com/watch?v=example12' },
    ],
  },
];

const Learning = () => {
  const initialCheckedState = subjects.map(subject => new Array(subject.videos.length).fill(false));
  const [checkedState, setCheckedState] = useState(initialCheckedState);

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
              {subjects.map((subject, subjectIndex) => (
                <Card variant="outlined" sx={{ marginBottom: 2 }} key={subject.name}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {subject.name}
                    </Typography>
                    <Box my={2}>
                      <LinearProgress variant="determinate" value={calculateProgress(checkedState[subjectIndex])} />
                      <Typography variant="body1" mt={2}>
                        Progress: {Math.round(calculateProgress(checkedState[subjectIndex]))}%
                      </Typography>
                    </Box>
                    <List>
                      {subject.videos.map((video, videoIndex) => (
                        <ListItem key={video.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkedState[subjectIndex][videoIndex]}
                                onChange={() => handleCheckboxChange(subjectIndex, videoIndex)}
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
              ))}
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Learning;
