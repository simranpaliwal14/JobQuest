import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../App.css'; // Ensure this path is correct

const ViewApplications = () => {
    const [searchParams] = useSearchParams();
    const jobPostId = searchParams.get('jobPostId'); // Get jobPostId from the URL
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState(''); // State for status filter

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/applications/job/${jobPostId}`);
                setApplications(response.data);
                setFilteredApplications(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch applications.');
                setLoading(false);
            }
        };

        if (jobPostId) {
            fetchApplications();
        }
    }, [jobPostId]);

    // Filter applications based on the search term and status filter
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterApplications(term, statusFilter);
    };

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setStatusFilter(status);
        filterApplications(searchTerm, status);
    };

    const filterApplications = (term, status) => {
        const filtered = applications.filter((app) => {
            const isPending = app.status !== 'Accepted' && app.status !== 'Rejected';
            const applicationStatus = status === 'Pending' ? isPending : (status ? app.status === status : true);
            return (app.candidateName.toLowerCase().includes(term.toLowerCase()) ||
                    app.candidateEmail.toLowerCase().includes(term.toLowerCase())) &&
                   applicationStatus;
        });
        setFilteredApplications(filtered);
    };

    const handleAccept = async (applicationId) => {
        try {
            await axios.post(`http://localhost:8080/api/applications/${applicationId}/accept`);
            alert('Application accepted.');
            updateApplicationStatus(applicationId, 'Accepted');
        } catch (error) {
            alert('Failed to accept application.');
        }
    };

    const handleReject = async (applicationId) => {
        try {
            await axios.post(`http://localhost:8080/api/applications/${applicationId}/reject`);
            alert('Application rejected.');
            updateApplicationStatus(applicationId, 'Rejected');
        } catch (error) {
            alert('Failed to reject application.');
        }
    };

    const updateApplicationStatus = (applicationId, newStatus) => {
        setApplications(applications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        ));
        setFilteredApplications(filteredApplications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        ));
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <h1 className="view-applications-title">Job Applications for Job Post ID: {jobPostId}</h1>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by candidate name or email"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            {/* Status Filter */}
            <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="status-filter"
            >
                <option value="">All Statuses</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option> {/* Show pending as an option */}
            </select>

            <div className="card-container">
                {filteredApplications.map(application => (
                    <div key={application.id} className="card">
                        <div className="card-content">
                            <h3 className="card-title">Application ID: {application.id}</h3>
                            <p className="application-detail"><strong>Candidate Name:</strong> {application.candidateName}</p>
                            <p className="application-detail"><strong>Candidate Email:</strong> {application.candidateEmail}</p>
                            <p className="application-detail">
                                <strong>Resume:</strong> 
                                {application.resume ? (
                                    <a href={`http://localhost:8080${application.resume}`} target="_blank" rel="noopener noreferrer">
                                    View Resume
                                </a>
                                ) : (
                                    'No resume available'
                                )}
                            </p>
                            <p className="application-detail"><strong>Status:</strong> {application.status || 'Pending'}</p>
                        </div>
                        <div className="card-actions">
                            <button
                                onClick={() => handleAccept(application.id)}
                                disabled={application.status === 'Accepted'}
                                className="accept-button"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(application.id)}
                                disabled={application.status === 'Rejected'}
                                className="reject-button"
                            >
                                Reject
                            </button>
                            {/* No need for the "Pending" button */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewApplications;
