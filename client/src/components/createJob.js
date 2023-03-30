import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';
import '../Styles/createJob.scss';
import "../Styles/create-job.scss";

export const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(true);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <label>Check Box to Require Resume</label>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
    </div>
  );
};

function JobApplicationForm() {

    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [createSuccess, setCreateSuccess] = useState('')
    const [createErr, setCreateErr] = useState('')
  
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const accessToken = localStorage.getItem("token")

    const handleSubmit = async (event) => {
      //Prevent the form from it's default behavior, which reloads the page
      event.preventDefault()
      // Do something with the form data, such as send it to a server
      console.log({ title, experience, location, description });

      await axios.post(SERVER_URL + '/createJobs', {title,experience, location, description, accessToken})
      .then(response => {
        console.log(response.data.isError);
          //If backend returns an error
          if(response.data.isError == "True"){
            setCreateErr(response.data.message)
            setCreateSuccess('')
          }

          //If backend returns success
          if(response.data.isError == "False"){
            setCreateErr('')
            setCreateSuccess(response.data.message)
            console.log("Redirecting to jobs page");
            setTimeout(()=>{
                window.location.href = "/jobs"
                }, 3000)
          }
          
      })
      .catch(error => {
         console.log(error);
      });
  };

  return (
    <>
        <NavBar></NavBar>

        <div className="createjob-form" data-testid="createJob-1">
            <div className="createjob-container">
            <h2 id="createjob_title">Create Job</h2>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                Title:
                <input required type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <br />
                <label>
                Experience:
                <input required type="text" value={experience} onChange={(event) => setExperience(event.target.value)} />
                </label>
                <br />
                <label>
                Location:
                <input required type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                </label>
                <br />
                <label>
                Description:
                <br />
                <textarea required value={description} onChange={(event) => setDescription(event.target.value)} />
                </label>
                <br />
                
                <button type="submit">Submit</button>
                <div className='createErr'>{createErr}</div>
                <div className='createSuccess'>{createSuccess}</div>
            </form>

            </div>
       </div>
    </>
    
    );
  }

export default JobApplicationForm;
