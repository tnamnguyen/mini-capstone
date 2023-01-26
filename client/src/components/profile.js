import React from 'react';
import NavBar from './navBar';
import '../Styles/profile.scss';

//Function returning the proper greeting depending on time of day
function getGreeting(){
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 5 && currentHour <=12){
        return "Good Morning";
    }
    else if (currentHour > 12 && currentHour <= 18){
        return "Good Evening";
    }
    else{
        return "Good Night";
    }
}

function Profile() {

    return (
        <>
            <NavBar></NavBar>
            <div class='container1'>
                <div class='profile_pic'>
                    <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic'></img>
                </div>
                <br></br>
                <div class='container2'>
                    <div class='greeting'>{getGreeting()} Name</div>
                    <div class='education'>Education</div>
                    <div class='job'>Current / Past Job</div>
                    <div class='languages'>Languages: French/English</div>
                    <div class='bio'>
                        <label id='bio_title'>Bio:</label>
                        <p id='bio_text'>4TH year software engineering student at Concordia University</p>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Profile