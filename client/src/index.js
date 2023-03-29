import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import Login from "./components/login";
import Logout from "./components/logout";
import Signup from "./components/signup";
import Home from "./components/home";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile.js";
import JobApplicationForm from "./components/createJob.js";
import JobList from "./components/jobs.js";
import SavedJobList from "./components/savedJobs";
import Admin from "./components/admin";
import AdminListUsers from "./components/adminListUsers";
import "bootstrap/dist/css/bootstrap.css";
import MyJobList from "./components/myJobs";
import JobEditForm from "./components/editJob";
import ForgotPassword from "./components/forgotPassword";
import ResetPassword from "./components/resetPassword";
import Connections from './components/connections.js';
import AddConnections from './components/addConnections.js';
import PendingConnections from './components/pendingConnections.js';
import OTP from "./components/OTP"
import ViewJob from "./components/viewJob";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/createJobs" element={<JobApplicationForm />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/savedJobs" element={<SavedJobList />} />
        <Route path="/myJobs" element={<MyJobList />} />
        <Route path="/editJob/:jobId" component={JobEditForm} element={<JobEditForm />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/OTP" element={<OTP/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/adminListUsers" element={<AdminListUsers/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/addConnections" element={<AddConnections/>}/>
        <Route path="/pendingConnections" element={<PendingConnections/>}/>
        <Route path="/viewJob" element={<ViewJob />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
