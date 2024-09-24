import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css';

const JobPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/jobs', {
                title,
                description,
                company,
                location,
                category
            });
            setSuccess('Job posted successfully!');
            setTitle('');
            setDescription('');
            setCompany('');
            setLocation('');
            setCategory('');
            setError('');
        } catch (error) {
            setError('Failed to post the job.');
            setSuccess('');
            console.error('Job posting failed', error);
        }
    };

    return (
        <div className="full-page-background">
            <Box
                component="form"
                onSubmit={handlePostJob}
                className="form-container"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Adds spacing between fields
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Post a Job
                </Typography>

                <TextField
                    label="Job Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Job Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Company Name"
                    variant="outlined"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    fullWidth
                />

                {/* Error and Success Alerts */}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Post Job
                </Button>
            </Box>
        </div>
    );
};

export default JobPost;
