import React, { useState, useEffect } from 'react';
import NavBar from './navBar';
import axios from "axios";
import '../Styles/home.scss';
import { Button } from 'reactstrap';
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
                            <div><text>{userName}</text></div>
                            <Link to="/profile"><Button color="primary">Profile</Button></Link>
                            </div>
                        </div>
                    <div className='home_posts'>
                        <div class="row">
                        <span class="column">
                            <text>&nbsp;&nbsp;&nbsp;&nbsp;</text>
                            <Link to="/connections"><button class="button_6">Connections</button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div><br></br></div>
                            <div><Link to="/savedJobs"><button class="button_6">Saved Jobs</button></Link></div>
                            <div><br></br></div>
                            <span><Link to="#"><button class="button_6">Messaging</button></Link></span>
                        </span>
                        <span class="column">
                            <div><Link to="/pendingConnections"><button class="button_6">Invites</button></Link></div>
                            <div><br></br></div>
                            <div><Link to="/myJobs"><button class="button_6" href="/myJobs">Your Jobs</button></Link></div>
                            <div><br></br></div>
                            <div><Link to="/appliedJobs"><button class="button_6">Applied Jobs</button></Link></div>
                        </span>
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
