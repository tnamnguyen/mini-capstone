import React, { useState, useEffect } from 'react';
import NavBar from './navBar';
import axios from "axios";
import '../Styles/home.scss';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";
import "../Styles/messaging.scss";

function Messaging() {
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

    const [isPageReady, setIsPageReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000); // Delay rendering by a second to let server know if user is logged in or not
    }, []);

    const handleClick = () => {
        // Your click event handler code here
        window.location = "#";

    };
    return (
        <>
            <NavBar></NavBar>
            <div className="inbox-container">
                <div className="inbox-header">
                    <h1>Inbox</h1>
                        <button className="addButton">+</button>
                </div>
                <div className="inbox-list">
                    <ul>
                        <li className="unread"  onClick={handleClick}>
                            <div className="sender">Alice Lawrence</div>
                            <div className="message">Hi, just want to remind you that our interview is tomorrow at
                                10am. See you then!
                            </div>
                            <div className="sentTime">10 minutes ago</div>
                        </li>
                        <li onClick={handleClick}>
                            <div className="sender">Peter Patel</div>
                            <div className="message">Hi, we would like to let you know that you have been selected for
                                this position. More information will follow in the next hours.
                            </div>
                            <div className="sentTime">2 hours ago</div>
                        </li>
                        <li onClick={handleClick}>
                            <div className="sender">John Doe</div>
                            <div className="message">We are sorry to inform you this position has been filled else where.
                                Therefore we have no choice but to cancel your upcoming interview.
                            </div>
                            <div className="sentTime">3 days ago</div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Messaging;
