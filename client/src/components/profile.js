import React, { useState } from 'react';
import { useEffect } from 'react';
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
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const accessToken = localStorage.getItem("token")                

    const isTokenAvailable = (accessToken != null)
    useEffect(() => {
        if (isTokenAvailable){
            axios.post(SERVER_URL + '/profile', {accessToken})
            .then(response => {
                console.log(response.data.profileExists)
                if(response.data.profileExists == "True"){
                    setUserName(response.data.user.name)
                    setEducation(response.data.education)
                    setCurrentJob(response.data.currentJob)
                    setPastJob(response.data.pastJob)
                    setLanguages(response.data.languages)
                    setBio(response.data.bio)
                }
                
                else if(response.data.profileExists == "False"){
                    console.log("Reloading the page to load profile generated")
                        window.location.reload(true)

                }
            })
        }
    }, []);


    const [profilePic, setProfilePic] = useState('../assets/images/profile.png');
    const [userName, setUserName] = useState('');
    const [education, setEducation] = useState('');
    const [currentJob, setCurrentJob] = useState('');
    const [pastJob, setPastJob] = useState('');
    const [languages, setLanguages] = useState('');
    const [bio, setBio] = useState('');
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
                        <Link to="/editprofile">
                            <button id='profile_edit_profile_button'>Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Profile