import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ScholarshipTable = () => {
  // Hard-coded data for scholarship status and details
  const scholarshipData = [
    { status: 'Pending', details: 'Pending scholarship A details' },
    { status: 'Accepted', details: 'Accepted scholarship B details' },
    { status: 'Rejected', details: 'Rejected scholarship C details' },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Typography variant="h5" gutterBottom>
        Scholarship Application Status
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scholarshipData.map((scholarship, index) => (
            <TableRow key={index}>
              <TableCell>{scholarship.status}</TableCell>
              <TableCell>{scholarship.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScholarshipTable;
