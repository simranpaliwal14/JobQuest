// src/pages/Registration.js
import React, { useState } from 'react';
import { Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this includes your custom CSS

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        user: {
          username,
          password
        },
        roleName: role
      });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="home-container">
    
      <Box className="registration-box">
        <Typography variant="h3" gutterBottom>Register</Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Register
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Registration;
