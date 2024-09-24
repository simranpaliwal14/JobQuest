// src/pages/EmployeeDashboard.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure this includes your custom CSS if needed

const EmployeeDashboard = () => {
    return (
        <div
            className="dashboard-background"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <Box className="dashboard-box">
                <Typography variant="h3" gutterBottom>
                    Employee Dashboard
                </Typography>
                <Typography variant="h6" paragraph>
                    Welcome to the Employee Dashboard! Here you can view job postings, apply for jobs, and check the status of your job applications.
                </Typography>
                <div>
                    <Link to="/employee/view-jobs" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: '10px', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                        >
                            View Jobs
                        </Button>
                    </Link>
                    <Link to="/employee/apply-for-job" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: '10px', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}
                        >
                            Apply for a Job
                        </Button>
                    </Link>
                    <Link to="/employee/view-applied-jobs" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ margin: '10px', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}
                        >
                            View Applied Jobs
                        </Button>
                    </Link>
                </div>
            </Box>
        </div>
    );
};

export default EmployeeDashboard;
