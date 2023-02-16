import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';

function JobApplicationForm() {
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
  
    const SERVER_URL = "//localhost:3001"

    const handleSubmit = async () => {
      
      // Do something with the form data, such as send it to a server
      console.log({ title, experience, location, description });

      await axios.post(SERVER_URL + '/createJobs', {title,experience, location, description})
      .then(response => {
          //If backend returns an error
          if(response.data.isError == "True"){
              
          }

          //If backend returns success
          if(response.data.isError == "False"){
              

              setTimeout(()=>{
                  window.location.href = "http://localhost:3000/"
              }, 4000)
          }
          
      })
      .catch(error => {
         
      });


    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Experience:
          <input type="text" value={experience} onChange={(event) => setExperience(event.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
  
  export default JobApplicationForm;