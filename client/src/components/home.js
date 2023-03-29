import React, { useState, useEffect } from 'react';
import NavBar from './navBar';
import axios from "axios";
import '../Styles/home.scss';
import {Link} from "react-router-dom";

function Home() {
    const [login, setLogin] = useState(true)
    const [userName, setUserName] = useState('UserName');
    
   
    //Check if User is logged-in
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const accessToken = localStorage.getItem("token")
    axios.post(SERVER_URL + '/home', {accessToken})
    .then(response => {
        setUserName(response.data.user.name)
        setLogin(false)
    })

    
    function defaultHome() {
        if(login) {
            return (
                <div className="content">
                    <header className="header">
                        <h1 className="header-title">Jobilee</h1>
                        <div className="button-container">
                            <Link to="/login">
                                <button className="rounded-button" id='log_in_button'>Log In</button>
                            </Link>
                            <Link to="/jobs">
                                <button className="normal-button" id='log_in_button' >View Jobs</button>
                            </Link>
                        </div>
                    </header>
                </div>
            )
        }
    }

    function loggedinHome() {
        if (!login) {
            return(
                <div class='home_main_container'>
                    <div class='home_main_profile'>
                        <div>
                            <div class='profile_pic'>
                                <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic' id='home_profile_pic'></img>
                            </div>
                            <div>{userName}</div><br></br>
                            <text>Bio</text><br></br>
                            <text>Who viewed your profile: 34</text><br></br>
                            <text>Total Connections: 12</text><br></br>
                            </div>
                        </div>
                        <div class='home_posts'>
                            <div>
                                <text>User Likes this</text><br></br>
                                <text>User got a new job</text><br></br>
                                <text>User update</text><br></br>
                            </div>
                        </div>
                        <div class='home_news'>
                            <div>
                                <text>Jubilee News #1</text><br></br>
                                <text>Jubilee News #2</text><br></br>
                                <text>Jubilee News #3</text><br></br>
                            </div>
                        </div>
                </div>
            )
        }
    }

    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000); // Delay rendering by a second to let server know if user is logged in or not 
    }, []);

    return (
        <>
            {isPageReady && (
                <>
                    {!login && <NavBar/>} 
                    {loggedinHome()}
                    {defaultHome()}
                </>
            )}
        </>
    );
}

export default Home
