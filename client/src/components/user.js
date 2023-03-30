import React, { useState } from 'react';
import { useEffect } from 'react';
import NavBar from './navBar';
import {Link,useLocation } from "react-router-dom";
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

function User() {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const accessToken = localStorage.getItem("token")                

    const isTokenAvailable = (accessToken != null)

 /*   // get response for user profile
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
    */
    const [profilePic, setProfilePic] = useState('../assets/images/profile.png');
    const [userName, setUserName] = useState('');
    const [education, setEducation] = useState('');
    const [currentJob, setCurrentJob] = useState('');
    const [pastJob, setPastJob] = useState('');
    const [languages, setLanguages] = useState('');
    const [bio, setBio] = useState('');
    const [resume, setResume] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');


    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const IdFromUrl = query.get('Id');

  useEffect(() => {
    if (IdFromUrl) {
      setSelectedUserId(IdFromUrl);
    }
  }, [IdFromUrl]);


    useEffect(() => {
        if (selectedUserId !== '') {
            axios.post(SERVER_URL + '/user', {selectedUserId})
                .then(response => {
                    const { username, education, pastJob, currentJob, languages, bio } = response.data;
                    /*setUserName(response.data.user.name)
                    setEducation(response.data.education)
                    setCurrentJob(response.data.currentJob)
                    setPastJob(response.data.pastJob)
                    setLanguages(response.data.languages)
                    setBio(response.data.bio)*/
                    setUserName("blank for now");
                    setEducation(education);
                    setPastJob(pastJob);
                    setCurrentJob(currentJob);
                    setLanguages(languages);
                    setBio(bio);
                })
        }
    }, [selectedUserId]);
   

    return ( 
        <>
            <NavBar></NavBar>
            <div class='profile_container1' data-testid="profile_container">
                <div class='profile_pic'>
                    <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic'></img>
                </div>
                <br></br>
                <div class='profile_container2'>
                    <div class='profile_greeting'>This is {userName} 's profile </div>
                    <div class='profile_education'>Education: {education}</div>
                    <div class='profile_past_job'>Past Job: {pastJob}</div>
                    <div class='profile_current_job'>Current Job: {currentJob}</div>
                    <div class='profile_languages'>Languages: {languages}</div>
                    <div class='profile_bio'>
                        <label id='bio_title'>Bio</label>
                        <p id='bio_text'>{bio}</p>
                    </div>
                   
                </div>
            </div>
            
        </>
    );
}

export default User