import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';

function JobList() {
    const [jobs, setJobs] = useState([]);
  
    useEffect(() => {
      // Fetch all jobs from the backend API when the component mounts
      axios.get('/api/jobs')
        .then(response => {
          setJobs(response.data);
        })
        .catch(error => {
          console.error('Error fetching jobs:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>All Jobs</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.experience}</td>
                <td>{job.location}</td>
                <td>{job.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default JobList;