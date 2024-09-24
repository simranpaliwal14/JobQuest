import "./App.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import EmployerDashboard from './pages/EmployerDashboard';

import JobPost from './components/JobPost';           // Import the JobPost component
import ViewJobPosts from './components/ViewJobPosts'; // Import the ViewJobPosts component
import JobPostList from './components/JobPostList';   // Import the JobPostList component
import ViewApplications from './components/ViewApplications';
import EditJobPost from './components/EditJobPost';

import EmployeeDashboard from './pages/EmployeeDashboard';
import ViewJobs from './components/ViewJobs'; // Ensure paths are correct
import ApplyForJob from './components/ApplyForJob'; // Ensure paths are correct
import CheckApplicationStatus from './components/CheckApplicationStatus'; // Ensure paths are correct
import ViewAppliedJobs from './components/ViewAppliedJobs'; // Import the new component



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        
        
        {/* Employer Routes */}
        <Route path="/employer/post-job" element={<JobPost />} />
        <Route path="/employer/view-job-posts" element={<ViewJobPosts />} />
        <Route path="/employer/manage-job-posts" element={<JobPostList />} /> 
        <Route path="/admin/job-posts/edit/:id" element={<EditJobPost />} />       
        <Route path="/employer/view-applications" element={<ViewApplications jobPostId={"some-job-post-id"} />} />

        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/view-jobs" element={<ViewJobs />} />
        <Route path="/employee/apply-for-job" element={<ApplyForJob />} />
        <Route path="/employee/check-application-status" element={<CheckApplicationStatus />} />
        <Route path="/employee/view-applied-jobs" element={<ViewAppliedJobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
