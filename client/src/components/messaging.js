import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/messaging.scss";

function getMessages() {}

function Messaging() {
  const practiceMessage = "Stuff to write about";
  return (
    <div>
      <NavBar></NavBar>
      <div className="messaging-container">
        <div className="title">
          <h1>Messaging with "Insert UserName Here"</h1>
        </div>

        <div className="message-userSide">{practiceMessage}</div>
        <div className="message-otherSide">{practiceMessage}</div>
        <button>Upload File</button>
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Messaging;
