import React, { useState } from 'react';
import {  useEffect  } from 'react';
import NavBar from './navBar';
import {Link} from "react-router-dom";
import '../Styles/profile.scss';
import axios from "axios"

//Function returning the proper greeting depending on time of day
function getGreeting(){
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 5 && currentHour <=12){
        return "Good Morning, ";
    }
    else if (currentHour > 12 && currentHour <= 18){
        return "Good Evening, ";
    }
    else{
        return "Good Night, ";
    }
}

function Profile() {
    const SERVER_URL = "http://localhost:3001"

    const accessToken = localStorage.getItem("token")  
    const id = localStorage.getItem("id")               

    const isTokenAvailable = (localStorage.getItem("token" != null))

    axios.post(SERVER_URL + '/profile', {accessToken, id})
    .then(response => {
        // setUserName(response.data.user.name) //Currently this does not display username
        setEducation(response.data.education)
        setCurrentJob(response.data.currentJob)
        setPastJob(response.data.pastJob)
        setLanguages(response.data.languages)
        setBio(response.data.bio)
    })

    const [profilePic, setProfilePic] = useState('../assets/images/profile.png');
    const [userName, setUserName] = useState('UserName');
    const [education, setEducation] = useState('Education');
    const [currentJob, setCurrentJob] = useState('Current Job');
    const [pastJob, setPastJob] = useState('Past Job');
    const [languages, setLanguages] = useState('Languages');
    const [bio, setBio] = useState('Bio');
    const [resume, setResume] = useState('');

    
   

    return ( 
        <>
            <NavBar></NavBar>
            <div class='profile_container1'>
                <div class='profile_pic'>
                    <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic'></img>
                </div>
                <br></br>
                <div class='profile_container2'>
                    <div class='profile_greeting'>{getGreeting() + userName} 
                </div>
                    <div class='profile_education'>Education: {education}</div>
                    <div class='profile_past_job'>Past Job: {pastJob}</div>
                    <div class='profile_current_job'>Current Job: {currentJob}</div>
                    <div class='profile_languages'>Languages: {languages}</div>
                    <div class='profile_bio'>
                        <label id='bio_title'>Bio</label>
                        <p id='bio_text'>{bio}</p>
                    </div>
                    <div class='profile_resume'>Resume: {resume}</div>
                    <div class="profile_edit_profile">
                        <Link to="/editProfile">
                            <button id='profile_edit_profile_button'>Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Profile