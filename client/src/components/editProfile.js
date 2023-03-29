import React, { useState } from 'react';
import {    useEffect   } from 'react';
import NavBar from './navBar';
import '../Styles/editProfile.scss';
import axios from "axios"

function EditProfile() {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const accessToken = localStorage.getItem("token")

    useEffect(() => {
        axios.post(SERVER_URL + '/editprofile', {accessToken})
        .then(response => {
            setUserName(response.data.user.name)
            setEducation(response.data.education)
            setCurrentJob(response.data.currentJob)
            setPastJob(response.data.pastJob)
            setLanguages(response.data.languages)
            setBio(response.data.bio)

        })
        .catch(error => {
            console.log(error)
        });
    }, []);

    function handleChanges() {
        console.log('submit changes button was clicked')
        axios.post(SERVER_URL + '/submiteditprofile', {
            accessToken, userName, education, pastJob, currentJob, languages, bio})
        .then(response => {
            if(response.data.isError == "True"){
                console.log("An error has occured")
                setEditStatus_err(response.data.message)
                setEditStatus_success('')
                
            }
            if(response.data.isError == "False"){
                localStorage.removeItem("token")
                localStorage.setItem("token", response.data.token)
                setEditStatus_err('')
                setEditStatus_success(response.data.message)

                // Redirect to profile page
                console.log("Redirecting to profile page")
                setTimeout(()=>{
                    window.location.href = "/profile"
                }, 3000)
            }
        })
    }


    //HTML Forms that appear under each field when the "Edit" button is pressed
    const [editProfilePic, setEditProfilePic] = useState(false);
    const [editUserName, setEditUserName] = useState(false);
    const [editEducation, setEditEducation] = useState(false);
    const [editPastJob, setEditPastJob] = useState(false);
    const [editCurrentJob, setEditCurrentJob] = useState(false);
    const [editLanguages, setEditLanguages] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [editResume, setEditResume] = useState(false);

    //Variables holding the values of different fields
    const [profilePic, setProfilePic] = useState('../assets/images/profile.png');
    const [userName, setUserName] = useState('');
    const [education, setEducation] = useState('');
    const [currentJob, setCurrentJob] = useState('');
    const [pastJob, setPastJob] = useState('');
    const [languages, setLanguages] = useState('');
    const [bio, setBio] = useState('');
    const [resume, setResume] = useState('');

    //Variables for the feedback
    const [editStatus_success, setEditStatus_success] = useState('');
    const [editStatus_err, setEditStatus_err] = useState('');
    
    return ( 
        <>
            <NavBar></NavBar>
           
                <div class='edit_profile_container1' data-testid="container">
    
                    {/* ********** Profile Picture Element ********** */}
                    <div class='edit_profile_pic'>
                        <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic'></img>
                        <br></br>
                        <button onClick={() => setEditProfilePic(!editProfilePic)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editProfilePic && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={profilePic}
                                    onChange={(e) => setProfilePic(e.target.value)}
                                    />
                                    <button onClick={() => setEditProfilePic(!editProfilePic)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                    </div>
                    <br></br>
            

                    <div class='edit_profile_container2'>

                        {/* ********** UserName Element ********** */}
                        <div class='edit_profile_greeting'>UserName: {userName} 
                        <button onClick={() => setEditUserName(!editUserName)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editUserName && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <button onClick={() => setEditUserName(!editUserName)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                    </div>

                        {/* ********** Education Element ********** */}
                        <div class='edit_profile_education'>Education: {education}
                        <button onClick={() => setEditEducation(!editEducation)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editEducation && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    />
                                    <button onClick={() => setEditEducation(!editEducation)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>
                        

                        {/* ********** Past Job Element ********** */}
                        <div class='edit_profile_past_job'>Past Job: {pastJob}
                        <button onClick={() => setEditPastJob(!editPastJob)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editPastJob && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={pastJob}
                                    onChange={(e) => setPastJob(e.target.value)}
                                    />
                                    <button onClick={() => setEditPastJob(!editPastJob)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>


                        {/* ********** Current Job Element ********** */}
                        <div class='edit_profile_current_job'>Current Job: {currentJob}
                        <button onClick={() => setEditCurrentJob(!editCurrentJob)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editCurrentJob && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={currentJob}
                                    onChange={(e) => setCurrentJob(e.target.value)}
                                    />
                                    <button onClick={() => setEditCurrentJob(!editCurrentJob)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>


                        {/* ********** Languages Element ********** */}
                        <div class='edit_profile_languages'>Languages: {languages}
                        <button onClick={() => setEditLanguages(!editLanguages)} id='edit_profile_edit_button'>
                            <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                        </button>
                            {editLanguages && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    />
                                    <button onClick={() => setEditLanguages(!editLanguages)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>


                        {/* ********** Profile Bio Element ********** */}
                        <div class='edit_profile_bio'>
                            <label id='edit_bio_title'>Bio</label>
                            <p id='edit_bio_text'>{bio}</p>
                            <button onClick={() => setEditBio(!editBio)} id='edit_profile_edit_button'>
                                <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                            </button>
                            {editBio && 
                                <form>
                                    <input 
                                    type="text"
                                    required
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    />
                                    <button onClick={() => setEditBio(!editBio)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>


                        {/* ********** Resume Element ********** */}
                        <div class='edit_profile_resume'>Resume: {resume}
                        <br></br>
                        <button onClick={() => setEditResume(!editResume)} id='edit_profile_edit_button'>
                                <img src={require('../assets/images/edit.png')} width='30' height='30' alt='profile pic'></img>
                            </button>
                            {editResume && 
                                <form>
                                    <input 
                                    type="file"
                                    required
                                    value={resume}
                                    onChange={(e) => setResume(e.target.value)}
                                    />
                                    <button onClick={() => setEditResume(!editResume)} id='edit_profile_update_button'>Update!</button>
                                </form>
                            }
                        </div>
                        


                        {/* ********** Submit Button ********** */}
                        <div class="edit_profile_submit">
                            <button id='edit_profile_submit_button' onClick={() => handleChanges()}>Submit Changes!</button>
                            <div className='editStatus_err'>{editStatus_err}</div>
                            <div className='editStatus_success'>{editStatus_success}</div>
                        </div>
                    </div>
                </div>
            
        </>
    );
}

export default EditProfile