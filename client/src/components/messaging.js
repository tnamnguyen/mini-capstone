import React, { useState, useEffect } from 'react';
import NavBar from './navBar';
import axios from "axios";
import '../Styles/home.scss';
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";
import "../Styles/messaging.scss";
import moment from "moment";

function Messaging() {
    const [login, setLogin] = useState(true)
    const [userName, setUserName] = useState('UserName');
    const [refetch, setRefetch] = useState(0);
    const [user1, setUser1] = useState("");
    const [messages, setMessages] = useState([]);


    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    const accessToken = localStorage.getItem("token")
    axios.post(SERVER_URL + '/home', {accessToken})
        .then(response => {
            setUserName(response.data.user.name)
            setLogin(false)
        })

    const [isPageReady, setIsPageReady] = useState(false);

      // assigning user 1 as the logged-in user
  const isTokenAvailable = localStorage.getItem("token") != null;
  useEffect(() => {
    if (isTokenAvailable) {
      axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
        setUser1(response.data.user);
        console.log("the logged in user is " + user1);
      });
    }
  }, []);

    useEffect(() => {
        if (user1?.id) {
            axios
              .get(SERVER_URL + `/messages/${user1.id}`)
              .then((response) => {
                setMessages(response?.data?.data);
                console.log("Mounted");
                console.log(response);
                console.log(messages, "user messages");
              })
              .catch((error) => {
                console.error("Error fetching messages in front-end:", error);
              });
          }
        setTimeout(() => {
            setIsPageReady(true);
        }, 1000); // Delay rendering by a second to let server know if user is logged in or not
    }, [user1]);
    console.log(user1.id);


    const handleSend = () => {
        // Your click event handler code here
        window.location = "#";

    };

    const handleClick = () => {
        // Your click event handler code here
        window.location = "/sendMessage";

    };
    return (
        <>
            <NavBar></NavBar>
            <div className="inbox-container">
                <div className="inbox-header">
                    <h1>Inbox</h1>
                        <button className="addButton" onClick={handleClick}>+</button>
                </div>
                <div className="inbox-list">
                    <ul>
                        {messages?.map((message) => (
                        <li className="newMess"  onClick={handleSend} key={message._id}>
                            <div className="sender">{message.user2Name === user1?.name
                                                    ? message.user1Name
                                                    : message.user2Name}</div>
                            <div>
                                {message.message}
                            </div>
                            <div className="sentTime"></div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Messaging;
