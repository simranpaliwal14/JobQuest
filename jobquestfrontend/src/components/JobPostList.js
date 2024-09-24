import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure this path is correct

const JobPostList = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/jobs');
                setJobPosts(response.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/jobs/${id}`);
            setJobPosts(jobPosts.filter(post => post.id !== id));
            alert('Job Post Deleted!');
        } catch (error) {
            console.error('Error deleting job post:', error);
            alert('Error deleting job post.');
        }
    };

    // Filter job posts based on the search term
    const filteredJobPosts = jobPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="jobs-post-title">Jobs Posted</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search jobs by title, company, location, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                className="job-search-input"
            />

            <div className="card-container">
                {filteredJobPosts.map(post => (
                    <div key={post.id} className="card">
                        <div className="card-content">
                            <h3 className="card-title">Job Post ID: {post.id}</h3>
                            <h3 className="job-title">Title: {post.title}</h3>
                            <p className="job-details">Description: {post.description}</p>
                            <p className="job-details">Company: {post.company}</p>
                            <p className="job-details">Location: {post.location}</p>
                            <p className="job-details">Category: {post.category}</p>
                        </div>
                        <div className="card-actions">
                            <Link to={`/admin/job-posts/edit/${post.id}`} className="edit-button">Edit</Link>
                            <button onClick={() => handleDelete(post.id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobPostList;
