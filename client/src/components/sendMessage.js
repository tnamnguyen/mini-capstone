import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/sendMessage.scss";

function Messages() {
  const isTokenAvailable = localStorage.getItem("token");
  const accessToken = localStorage.getItem("token");
  const [users, displayUser] = useState([]);
  const [refetch, setRefetch] = useState(0);
  const [user1, setUser1] = useState("");
  const [showPopUp, setShowPopUp] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [messageValue, setMessageValue] = useState("");

  const SERVER_URL = process.env.REACT_APP_SERVER_URL


    // assigning user 1 as the logged-in user
    useEffect(() => {
        if (isTokenAvailable) {
          axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
            setUser1(response.data.user);
          });
        }
      }, []);

      useEffect(() => {
        // Fetch all users from the backend API when the component mounts
        axios
          .get(SERVER_URL + "/addConnections")
          .then((response) => {
            displayUser(response.data);
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      }, [refetch]);

      function handleUserChange(event) {
        const selectedUserId = event.target.value;
        setSelectedUser(selectedUserId);
        const selectedUser = users.find(user => user._id === selectedUserId);
        if (selectedUser) {
          setSelectedUserName(selectedUser.name);
        } else {
          setSelectedUserName("");
        }
      }


    const handleSend = async (selectedUser, selectedUserName, messageValue) => {
      if(user1.id == selectedUser){
        setShowPopUp("you cannot message yourself")
        setTimeout(() => {
          window.location.reload();
        }, 4000);
        return; 
      }
        const data = {
          user1: user1.id,
          user1Name: user1?.name,
          user2: selectedUser,
          user2Name: selectedUserName,
          message: messageValue,
        };
        console.log(data);
        await axios
          .post(SERVER_URL + "/sendMessages", data)
          .then((response) => {
            console.log(response);
            //If backend returns an error
            if (response.data.status) {
              setShowPopUp(response.data.message);
              setRefetch(refetch + 1);
              setTimeout(()=>{
                setShowPopUp('')
              },3000)

              //Send a notification to the other user
              axios
              .post(SERVER_URL + "/createNotification", {
                accessToken,
                object_id: selectedUser,
                type: "Message Sent",
                message:  messageValue
              })
              .then((response) => {});



            } else {
              setTimeout(() => {
                window.location.href = "/";
              }, 4000);
            }
          })
          .catch((error) => {});
      };

      const handleSubmit = (e) => {
        e.preventDefault();
      };
  return (
    <div>
      <NavBar></NavBar>
        <form onSubmit={handleSubmit} >
        <div class="textbox"> Select the user you wish to send a message to &nbsp;
            <select id="users-dropdown" value={selectedUser} onChange={handleUserChange}>
                {users.map((user) => (
                      <option key={user.id} value={user._id}>
                        {user.name}
                      </option>
                    ))}  
            </select> <br></br>
          <br></br>
            <label>
              <input
                  class="textbox"
                type="text"
                id="messages-form"
                placeholder="Type your Message Here"
                onChange={(event) => {
                  setMessageValue(event.target.value);
                  // console.log(user1.name); // test
                  // console.log(user1.id); // test
                  // console.log(messageValue); // test
                  // console.log('the id is '+selectedUser); // test
                  // console.log(selectedUserName); // test
                }}
              />
            </label> <br></br>
          <br></br>
            <button
                className="button_6"
                onClick={() => handleSend(selectedUser, selectedUserName, messageValue)}
                >
                Send
            </button>
        </div>
        {showPopUp && (
              <div className="success-message popup">{showPopUp}</div>
            )}
        </form>
    </div>
  );
}

export default Messages;