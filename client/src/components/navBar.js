import React, { useState } from "react";
import "../Styles/navBar.scss";
import axios from "axios";
import { Button } from "reactstrap";

function NavBar() {
  //Use states holding user info
  const [loginElement, setLoginElement] = useState(true);
  const [adminElement, setAdminElement] = useState(false);
  const [userName, setUserName] = useState("");
  const [numNotifications, setNumNotifications] = useState(0);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const accessToken = localStorage.getItem("token");
  const isTokenAvailable = localStorage.getItem("token") != null;

  //If User is logged-in -> add his name to navBar & remove login button & retrive number of notifications
  if (isTokenAvailable) {
    axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
      //If user is logged in
      if (response.data.isLoggedIn) {
        setLoginElement(false);
        setUserName(response.data.user.name);
      }

      //If user is an admin
      if (response.data.isAdmin) {
        setAdminElement(true);
      }
    });

    axios
      .post(SERVER_URL + "/getNumberOfNotifications", { accessToken })
      .then((response) => {
        setNumNotifications(response.data);
      });
  }

  //Dynamic HTML elements
  function addAdminElement() {
    if (adminElement) {
      return (
        <li class="nav-item">
          <a class="nav-link" href="/admin">
            Admin
          </a>
        </li>
      );
    }
  }
  function addLoginElement() {
    if (loginElement) {
      return (
        <li class="nav-item">
          <a class="nav-link" href="/login">
            Log In
          </a>
        </li>
      );
    } else {
      return (
        <li class="nav-item">
          <Button class="nav-link" color="primary" href="/logout">
            Log Out
          </Button>
        </li>
      );
    }
  }
  function addUserGreeting() {
    if (!loginElement) {
      return (
        <li class="nav_item_1">
          <a class="nav-link" href="#">
            Hello, {userName}
          </a>
        </li>
      );
    }
  }

  //TODO: add href to connection page
  function addConnections() {
    if (!loginElement) {
      return (
        <li class="nav-item">
          <Button
            class="nav-link"
            outline
            color="secondary"
            href="/connections"
          >
            Connections
          </Button>
        </li>
      );
    }
  }

  //TODO: add href to chat page
  function addChat() {
    if (!loginElement) {
      return (
        <li class="nav-item">
          <Button class="nav-link" outline color="secondary" href="/messaging">
            Chat
          </Button>
        </li>
      );
    }
  }

  //TODO: add href to notifications page
  function addNotifications() {
    if (!loginElement) {
      return (
        <li class="nav-item">
          <Button
            class="nav-link"
            outline
            color="secondary"
            href="/notifications"
          >
            <a outline color="secondary">
              Notifications
              <span class="badge badge-warning" id="lblCartCount">
                {numNotifications}
              </span>
            </a>
          </Button>
        </li>
      );
    }
  }

  function addProfile() {
    if (!loginElement) {
      return (
        <li class="nav-item">
          <Button class="nav-link" outline color="secondary" href="/profile">
            Profile
          </Button>
        </li>
      );
    }
  }

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        data-testid="navBar"
      >
        <a class="navbar-brand" href="/">
          <h2 id="navbar_title">Jobilee</h2>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            {addConnections()}
            <li class="nav-item">
              <Button
                class="nav-link"
                id="job-button"
                outline
                color="secondary"
                href="/jobs"
              >
                Jobs
              </Button>
            </li>
            {addChat()}
            {addNotifications()}
            {addProfile()}
            {addAdminElement()}
            {addUserGreeting()}
            {addLoginElement()}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
