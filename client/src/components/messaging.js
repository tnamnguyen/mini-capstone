import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/messaging.scss";

function Messaging() {
  const practiceMessage = "Stuff to write about";
  //const SERVER_URL = "https://jobilee-server.vercel.app";
  const SERVER_URL = "http://localhost:3001";

  const [content, setContent] = useState("");
  const [document, setDocument] = useState("");
  const [userName, setUserName] = useState("UserName");

  const [error, setError] = useState("");
  const [messageStatus_success, setMessageStatus_success] = useState("");
  const [messageStatus_err, setMessageStatus_err] = useState("");

  const recipientId = "99999999";

  const accessToken = localStorage.getItem("token");
  axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
    setUserName(response.data.user.name);
  });

  const handleSubmit = async () => {
    await axios
      .post(SERVER_URL + "/messages", document, {
        recipientId,
        content,
      })
      .then((response) => {
        //If backend returns an error
        if (response.data.isError == "True") {
          setMessageStatus_err(response.data.message);
          setMessageStatus_success("");
        }
        //If backend returns success
        if (response.data.isError == "False") {
          setMessageStatus_err("");
          setMessageStatus_success(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.data.message);
      });
  };
  return (
    <div>
      <NavBar></NavBar>
      {error && <div className="error">{error}</div>}
      <div className="messaging-container">
        <div className="title">
          <h1>Messaging Between {userName} and "Insert UserName Here"</h1>
        </div>

        <div className="message-userSide">{practiceMessage}</div>
        <div className="message-otherSide">{practiceMessage}</div>
        <form>
          <input
            type="file"
            name="document"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <div className="messageStatus_err">{messageStatus_err}</div>
        <div className="messageStatus_success">{messageStatus_success}</div>
      </div>
    </div>
  );
}

export default Messaging;
