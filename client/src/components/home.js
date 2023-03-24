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
                <div class='home_main_container' data-testid="home_main_container">
                    <div class='home_main_profile'>
                        <div>
                            <div class='profile_pic'>
                                <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic' id='home_profile_pic'></img>
                            </div>
                            <div><text>{userName}</text></div>
                            <Button color="primary">Profile </Button>
                            </div>
                        </div>
                    <div className='home_posts'>
                        <div class="row">
                        <span class="column">
                            <Button color="primary">Connections</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <div><br></br></div>
                            <div><Button color="primary">Saved Jobs</Button>&nbsp;</div>
                            <div><br></br></div>
                            <span><Button color="primary">Messaging</Button></span>
                        </span>
                        <span class="column">
                            <div><Button color="primary">Invites</Button></div>
                            <div><br></br></div>
                            <div><Button color="primary" href="/jobs">Your Jobs</Button></div>
                            <div><br></br></div>
                            <div><Button color="primary">Applied Jobs</Button></div>
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
