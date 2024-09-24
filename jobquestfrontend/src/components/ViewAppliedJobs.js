import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import '../App.css'; // Ensure this path is correct

const ViewAppliedJobs = () => {
    const [email, setEmail] = useState('');  // State to hold the input email
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchJobs = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:8080/api/applications/applied-jobs?email=${email}`);
            
            if (response.status === 204) {
                setError('No applied jobs found.');
                setAppliedJobs([]);
            } else {
                setAppliedJobs(response.data);
            }
        } catch (error) {
            setError('Failed to fetch applied jobs.');
            setAppliedJobs([]);
        }

        setLoading(false);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Your Applied Jobs
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    marginBottom: 2,
                    backgroundColor: 'rgba(196, 174, 224, 0.8)' // Enclosed in quotes
                }}
            >
                <TextField
                    label="Enter your email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{
                        '& .MuiInputBase-input': {
                            backgroundColor: 'rgba(196, 174, 224, 0.8)', // Text field background color
                            color: 'black', // Text color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(196, 174, 224, 0.8)', // Border color when not focused
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(196, 174, 224, 1)', // Border color when hovering
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgba(196, 174, 224, 1)', // Border color when focused
                            },
                        },
                    }}
                />
                <Button variant="contained" color="primary" onClick={handleFetchJobs}>
                    View Applied Jobs
                </Button>
            </Box>
            
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            
            <Box sx={{ marginTop: 4 }}>
                {appliedJobs.length > 0 ? (
                    appliedJobs.map((job) => (
                        <Card key={job.id} sx={{ marginBottom: 2 ,backgroundColor: 'rgba(196, 174, 224, 0.8)' }}>
                            <CardContent>
                                <Typography variant="h6">Application ID: {job.id}</Typography>
                                <Typography> <strong>Job Post ID: </strong>{job.jobPostId}</Typography>
                                <Typography><strong>Candidate Name:</strong> {job.candidateName}</Typography>
                                <Typography><strong>Candidate Email:</strong> {job.candidateEmail}</Typography>
                                
                                {/* Render the resume as a link */}
                                <Typography>
                                    <strong>Resume:</strong> 
                                    {job.resume ? (
                                        <a href={`http://localhost:8080${job.resume}`} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    ) : (
                                        'No resume available'
                                    )}
                                </Typography>
                                
                                <Typography><strong>Application Status:</strong> {job.status}</Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No applied jobs found.</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ViewAppliedJobs;
