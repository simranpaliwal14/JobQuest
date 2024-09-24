// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../App.css'; // Ensure this includes your custom CSS

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Employee'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password,
                role
            });
            // Handle successful login (store token, etc.)
            console.log('Login successful', response.data);
            // Redirect based on role
            if (role === 'Admin') {
                navigate('/admin/dashboard');
            } else if (role === 'Employer') {
                navigate('/employer/dashboard');
            } else {
                navigate('/employee/dashboard');
            }            
        } catch (error) {
            setError('Invalid username, password, or role.');
            console.error('Login failed', error);
        }
    };

    return (
        <div className="home-container">
        
            <Box className="login-box">
                <Typography variant="h3" gutterBottom>Login</Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                        >
                            <MenuItem value="Employer">Employer</MenuItem>
                            <MenuItem value="Employee">Employee</MenuItem>
                        </Select>
                    </FormControl>
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '2%' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default Login;
