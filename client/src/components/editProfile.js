import React, { useState } from 'react';
import NavBar from './navBar';
import '../Styles/editProfile.scss';

function EditProfile() {

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
           
                <div class='edit_profile_container1'>
    
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
                            <button id='edit_profile_submit_button'>Submit Changes!</button>
                        </div>
                    </div>
                </div>
            
        </>
    );
}

export default EditProfile