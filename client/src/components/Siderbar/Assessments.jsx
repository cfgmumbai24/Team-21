import React, { useState, useEffect } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Box,
  Typography,
  LinearProgress,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
  Paper,
  ListItemSecondaryAction,
  Grid
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

import SidebarComponent from './Sidebar';
import NavBar from './NavBar';

const assessmentsData = [
  { id: 1, name: 'Math Test', status: 'Not Completed', progress: 40 },
  { id: 2, name: 'Science Project', status: 'Completed', progress: 100 },
  { id: 3, name: 'History Essay', status: 'Not Completed', progress: 20 },
  { id: 4, name: 'Geography Quiz', status: 'Completed', progress: 100 },
];

const Assessments = () => {
  const [items, setItems] = useState(assessmentsData);

  const handleStatusChange = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, status: item.status === 'Completed' ? 'Not Completed' : 'Completed' } : item
    );
    setItems(updatedItems);
  };

  const sortedItems = [...items].sort((a, b) => a.status === 'Completed' ? 1 : -1);

  const getCompletedCount = () => {
    return items.filter(item => item.status === 'Completed').length;
  };

  useEffect(() => {
    const completedCount = getCompletedCount();
    const completedCountJSON = JSON.stringify({ completedCourses: completedCount });

    fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: completedCountJSON
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, [items]);

  return (
    <>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item  xs={0} >
          <SidebarComponent />
        </Grid>
        <Grid item xs={9}>
          <Container>
            <Typography variant="h4" gutterBottom marginTop={2}>
              Assessments
            </Typography>
            <List>
              {sortedItems.map(item => (
                <Paper key={item.id} elevation={3} style={{ marginBottom: '16px' }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: '#fff', color: '#000' }}>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box display="flex" alignItems="center">
                          <LinearProgress
                            variant="determinate"
                            value={item.progress}
                            style={{ width: '68%', marginRight: '8px' }}
                          />
                          <Typography variant="body2" color="textSecondary">
                            {`${item.progress}%`}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <ToggleButtonGroup
                        value={item.status}
                        exclusive
                        onChange={() => handleStatusChange(item.id)}
                        size="small"
                      >
                        <ToggleButton value="Completed" style={{ backgroundColor: item.status === 'Completed' ? 'red' : '' }}>
                          Completed
                        </ToggleButton>
                        <ToggleButton value="Not Completed" style={{ backgroundColor: item.status === 'Not Completed' ? 'blue' : '' }}>
                          Not Completed
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
              ))}
            </List>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Assessments;
