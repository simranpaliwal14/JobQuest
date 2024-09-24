import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobs');
                setJobs(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch jobs.');
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    // Filter jobs based on the search term (case-insensitive)
    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading job posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="jobs-container">
            <h1 className="jobs-title">Jobs</h1>

            {/* Search input for filtering jobs */}
            <input 
                type="text" 
                placeholder="Search by title, company, location, or category" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
                className="job-search-input"
            />

            <div className="job-list">
                {/* If no jobs match the search term, display a message */}
                {filteredJobs.length === 0 ? (
                    <p>No jobs found.</p>
                ) : (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <h2>{job.title}</h2>
                            <p><strong>JobPostID:</strong> {job.id}</p>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Category:</strong> {job.category}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewJobs;
