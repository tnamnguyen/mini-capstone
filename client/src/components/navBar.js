import React, { useState } from 'react';
import "../Styles/navBar.scss"
import axios from "axios"

function NavBar() {

    //Use states holding user info
    const [login, setLogin] = useState(true)
    const [userName, setUserName] = useState('')

    //If User is logged-in -> add his name to navBar & remove login button
    const SERVER_URL = "https://jobilee-server.vercel.app"
    const accessToken = localStorage.getItem("token")
    const isTokenAvailable = (localStorage.getItem("token") != null)
    if(isTokenAvailable){
        axios.post(SERVER_URL + '/home', {accessToken})
        .then(response => {
            setLogin(false)
            setUserName(response.data.user.name)
        })
    }
    
    //Dynamic HTML elements
    function addLogIn(){
        if(login){
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
        if(!login){
            return(
                <li class="nav_item_1">
                    <a class="nav-link" href="#">Hello, {userName}</a>
                </li>
            )
        }
    }

    //TODO: add href to connection page
    function addConnections(){
        if(!login){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="#">Connections</a>
                </li>
            )
        }
    }

    //TODO: add href to chat page
    function addChat(){
        if(!login){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="#">Chat</a>
                </li>
            )
        }
    }

    //TODO: add href to notifications page
    function addNotifications(){
        if(!login){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="#">Notifications</a>
                </li>
            )
        }
    }

    
    function addProfile(){
        if(!login){
            return(
                <li class="nav-item">
                    <a class="nav-link" href="/profile">Profile</a>
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
                    {addConnections()}
                    <li class="nav-item">
                        <a class="nav-link" href="/jobs">Jobs</a>
                    </li>
                    {addChat()}
                    {addNotifications()}
                    {addProfile()}
                    {addLogIn()}
                    {addUserGreeting()}
                </ul>
            </div>
        </nav>
    </> 
  )
}

export default NavBar
