import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/connections.scss";


function AddConnections() {
  const [users, displayUser] = useState([]);
  const isTokenAvailable = localStorage.getItem("token");
  const [inputValue, setInputValue] = useState("");
  const accessToken = localStorage.getItem("token");
  const [user1, setUser1] = useState("");
  const [refetch, setRefetch] = useState(0);
  const [showPopUp, setShowPopUp] = useState("");
  
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


  const handleAdd = async (id, name) => {
    // Do something with the form data, such as send it to a server

    const data = {
      user1: user1.id,
      user1Name: user1?.name,
      user2: id,
      user2Name: name,
      status: "pending",
    };
    console.log(data);
    await axios
      .post(SERVER_URL + "/addConnections", data)
      .then((response) => {
        console.log(response);
        //If backend returns an error
        if (response.data.status) {
          setShowPopUp(response.data.message);
          setRefetch(refetch + 1);
          setTimeout(()=>{
            setShowPopUp('')
          },3000)
        } else {
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 4000);
        }
      })
      .catch((error) => {});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(user1);
  return (
    <>
      <NavBar></NavBar>
      <div className="createjob-form" data-testid="createJob-1">
        <div className="createjob-container" data-testid="addConnectionsTest">
          <h2 id="createjob_title">Add Connection</h2>
          <h5 id="createjob_title">More users exist</h5>
          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <input
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
              />
            </label>
            {/*  printing the users in table */}
            <div className="container">
              <table className="add-table" >
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => {
                      if (inputValue === "") {
                        return user;
                      } else if (
                        typeof user.name === "string" &&
                        inputValue
                          .toLowerCase()
                          .includes(user.name.toLowerCase())
                      ) {
                        return user;
                      }
                    })
                    .map((user) => (
                      <tr key={user.id}>
                        <td><a href={ '/user?Id=' + user._id }>{user.name}</a></td>
                        <td>
                          <button
                            className="button-14"
                            onClick={() => handleAdd(user._id, user?.name)}
                          >
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {showPopUp && (
              <div className="success-message popup">{showPopUp}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default AddConnections;
