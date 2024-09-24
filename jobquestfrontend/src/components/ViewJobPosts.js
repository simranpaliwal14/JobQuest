import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, CircularProgress, Alert, TextField } from '@mui/material';
import '../App.css'; // Ensure this path is correct

const ViewJobPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search term

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobs');
                setJobPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch job posts.');
                setLoading(false);
            }
        };

        fetchJobPosts();
    }, []);

    // Filter job posts based on the search term
    const filteredJobPosts = jobPosts.filter((jobPost) =>
        jobPost.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobPost.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobPost.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobPost.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <div className="container">
            <h1 className="jobs-post-title">Jobs Posted</h1>

            {/* Search Input */}
            <input 
                type="text" 
                placeholder="Search by title, company, location, or category" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
                className="job-search-input"
            />

            <div className="card-container">
                {filteredJobPosts.map((jobPost) => (
                    <div key={jobPost.id} className="card">
                        <div className="card-content">
                            <h3 className="card-title">Job Post ID: {jobPost.id}</h3>
                            <h3 className="job-title">Title: {jobPost.title}</h3>
                            <p className="job-details">Description: {jobPost.description}</p>
                            <p className="job-details">Company: {jobPost.company}</p>
                            <p className="job-details">Location: {jobPost.location}</p>
                            <p className="job-details">Category: {jobPost.category}</p>
                        </div>
                        <div className="card-actions">
                            <Link to={`/employer/view-applications?jobPostId=${jobPost.id}`} className="view-applications-button">
                                <Button variant="contained" color="primary">
                                    View Applications
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewJobPosts;
