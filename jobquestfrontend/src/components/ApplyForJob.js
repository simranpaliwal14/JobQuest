import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert, Input } from '@mui/material';
import '../App.css'; // Ensure this CSS file is available for global styles

const ApplyForJob = () => {
    const [jobPostId, setJobPostId] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [candidateEmail, setCandidateEmail] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleApplyJob = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('resume', resumeFile); // Ensure resumeFile is the actual file object
        formData.append('jobPostId', jobPostId);
        formData.append('candidateName', candidateName);
        formData.append('candidateEmail', candidateEmail);
    
        try {
            const response = await axios.post('http://localhost:8080/api/applications/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess('Application submitted successfully!');
            setJobPostId('');
            setCandidateName('');
            setCandidateEmail('');
            setResumeFile(null);
            setError('');
        } catch (error) {
            setError(`Failed to submit the application: ${error.response?.data || error.message}`);
            setSuccess('');
            console.error('Application submission failed', error);
        }
    };

    return (
        <div className="full-page-background"> {/* Ensure this CSS class handles full-page background */}
            <Box
                component="form"
                onSubmit={handleApplyJob}
                className="form-container"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: '600px', // Restricts form width
                    margin: 'auto',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Apply for a Job
                </Typography>

                <TextField
                    label="Job Post ID"
                    variant="outlined"
                    value={jobPostId}
                    onChange={(e) => setJobPostId(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Candidate Name"
                    variant="outlined"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Candidate Email"
                    type="email"
                    variant="outlined"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    required
                    fullWidth
                />
                
                {/* Heading for Resume Upload */}
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h8" sx={{ marginBottom: 1 }}>
                        Upload Resume <Typography component="span" sx={{ color: 'error.main' }}>*</Typography>
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            required
                            sx={{
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 1,
                                padding: 1,
                                backgroundColor: 'rgba(196, 174, 224, 0.8)'
  
  
                            }}
                        />
                    </Box>
                </Box>

                {/* Error and Success Alerts */}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Apply
                </Button>
            </Box>
        </div>
    );
};

export default ApplyForJob;
