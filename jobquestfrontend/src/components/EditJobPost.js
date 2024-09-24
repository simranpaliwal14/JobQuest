import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import '../App.css'; // Ensure this path is correct

const EditJobPost = () => {
    const { id } = useParams(); // Get job post ID from URL
    const navigate = useNavigate();
    const [jobPost, setJobPost] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        category: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchJobPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/jobs/${id}`);
                setJobPost(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching job post.');
                setLoading(false);
            }
        };

        fetchJobPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobPost((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/jobs/${id}`, jobPost);
            setSuccess('Job Post Updated!');
            setError('');
            setTimeout(() => navigate('/admin/job-posts'), 2000); // Redirect after success message
        } catch (error) {
            setError('Error updating job post.');
            setSuccess('');
            console.error('Error updating job post:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div className="full-page-background">
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="form-container"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2, // Adds spacing between fields
                    maxWidth: '600px',
                    mx: 'auto',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Edit Job Post
                </Typography>

                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    value={jobPost.title}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    multiline
                    rows={4}
                    value={jobPost.description}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Company"
                    variant="outlined"
                    name="company"
                    value={jobPost.company}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    name="location"
                    value={jobPost.location}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Category"
                    variant="outlined"
                    name="category"
                    value={jobPost.category}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                {/* Error and Success Alerts */}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Job Post
                </Button>
            </Box>
        </div>
    );
};

export default EditJobPost;
