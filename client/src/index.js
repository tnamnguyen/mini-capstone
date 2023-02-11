import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import Profile from "./components/profile";
import EditProfile from "./components/editProfile.js";
import Jobs from "./components/jobs.js";
import CreateJob from "./components/createJob";
import YourJobs from "./components/yourJobs";
import ViewJob from "./components/viewJob";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/createJob" element={<CreateJob />} />
        <Route path="/yourJobs" element={<YourJobs />} />
        <Route path="/viewJob" element={<ViewJob />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
