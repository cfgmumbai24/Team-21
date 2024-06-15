import React from 'react';

const ScholarshipTable = () => {
  // Hard-coded data for scholarship status and details
  const scholarshipData = [
    { status: 'Pending', details: 'Pending scholarship A details' },
    { status: 'Accepted', details: 'Accepted scholarship B details' },
    { status: 'Rejected', details: 'Rejected scholarship C details' },
  ];

  return (
    <div className="table-container">
      <h2>Scholarship Application Status</h2>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {scholarshipData.map((scholarship, index) => (
            <tr key={index}>
              <td>{scholarship.status}</td>
              <td>{scholarship.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScholarshipTable;
