import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from "./components/login";
import Logout from "./components/logout"
import Signup from "./components/signup";
import Home from "./components/home";
import Profile from "./components/profile";
import EditProfile from './components/editProfile.js';
import JobApplicationForm from './components/createJob.js';
import JobList from './components/jobs.js';
import "bootstrap/dist/css/bootstrap.css";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/editProfile" element={<EditProfile/>}/>
                <Route path="/createJobs" element={<JobApplicationForm/>}/>
                <Route path="/jobs" element={<JobList/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
