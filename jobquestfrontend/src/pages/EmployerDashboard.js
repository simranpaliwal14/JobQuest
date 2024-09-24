// src/pages/EmployerDashboard.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure this includes your custom CSS if needed

const EmployerDashboard = () => {
    return (
        <div className="dashboard-background">
            <Box className="dashboard-box">
                <Typography variant="h3" gutterBottom>
                    Employer Dashboard
                </Typography>
                <Typography variant="h6" paragraph>
                    Welcome to the Employer Dashboard! Here you can manage your job postings, view applications, and more.
                </Typography>
                <div>
                    <Link to="/employer/post-job" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ margin: '10px', bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>
                            Post a New Job
                        </Button>
                    </Link>
                    <Link to="/employer/view-job-posts" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ margin: '10px', bgcolor: '#2196f3', '&:hover': { bgcolor: '#1976d2' } }}>
                            View Posted Jobs
                        </Button>
                    </Link>
                    <Link to="/employer/manage-job-posts" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" sx={{ margin: '10px', bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}>
                            Manage Job Posts
                        </Button>
                    </Link>
                </div>
            </Box>
        </div>
    );
};

export default EmployerDashboard;
