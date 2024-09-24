// src/pages/Home.js
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'; // Make sure this includes your custom CSS

const Home = () => {
  return (
    <div className="home-container">
      <Box className="box">
        <Typography variant="h3" gutterBottom>
          Welcome to JobQuest
        </Typography>
        <Typography variant="h6" paragraph>
          Your gateway to exciting job opportunities and career growth.
        </Typography>
        <div>
          <Button sx={{ margin: '10px' }} variant="outlined">
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Button>
          <Button sx={{ margin: '10px' }} variant="outlined">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Home;
