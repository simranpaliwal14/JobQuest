import React, { useState } from 'react';
import axios from 'axios';

const CheckApplicationStatus = () => {
    const [applicationId, setApplicationId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const handleCheckStatus = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/applications/${applicationId}/status`);
            setStatus(`Application Status: ${response.data}`);
            setError('');
        } catch (error) {
            setError('Error checking application status. Application might not exist.');
            setStatus('');
            console.error('Error checking status', error);
        }
    };

    return (
        <form onSubmit={handleCheckStatus} style={{ margin: '5%' }}>
            <h2>Check Application Status</h2>
            <input
                type="text"
                placeholder="Application ID"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                required
            />
            <button type="submit">Check Status</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {status && <p style={{ color: 'green' }}>{status}</p>}
        </form>
    );
};

export default CheckApplicationStatus;
