import React, { useState } from 'react';
import "../Styles/navBar.scss"
import axios from "axios"

function NavBar() {

    //Use states holding user info
    const [loginElement, setLoginElement] = useState(true)
    const [adminElement, setAdminElement] = useState(false)
    const [userName, setUserName] = useState('')

    //Check if user is logged in & if user is admin to change navBar accordingly
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const accessToken = localStorage.getItem("token")
    const isTokenAvailable = (localStorage.getItem("token") != null)
    if(isTokenAvailable){
        axios.post(SERVER_URL + '/home', {accessToken})
        .then(response => {
            //If user is logged in
            if(response.data.isLoggedIn){
                setLoginElement(false)
                setUserName(response.data.user.name)
            }

            //If user is an admin
            if(response.data.isAdmin){
                setAdminElement(true)
            }
        })
    }



    //Dynamic HTML elements
    function addLogInElement(){
        if(adminElement){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="/admin">Admin</a>
                </li>
            )
        }
    }
    function addAdminElement(){
        if(loginElement){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="/login">Log In</a>
                </li>
            )
        }
        else
        {
            return(
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Log Out</a>
                </li>
            ) 
        }
    }
    function addUserGreeting(){
        if(!loginElement){
            return(
                <li class="nav_item_1">
                    <a class="nav-link" href="#">Hello, {userName}</a>
                </li>
            )
        }
    }

  return (
    <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" data-testid="navBar">
            <a class="navbar-brand" href="/"><h2 id = "navbar_title">Jobilee</h2></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/Connections">Connections</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/jobs">Jobs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Chat</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Notifications</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile">Profile</a>
                    </li>
                    {addLogInElement()}
                    {addUserGreeting()}
                    {addAdminElement()}
                </ul>
            </div>
        </nav>
    </> 
  )
}

export default NavBar
