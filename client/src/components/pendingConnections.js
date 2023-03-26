import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/connections.scss";

function PendingConnections() {
  const [connections, setConnections] = useState([]);
  const accessToken = localStorage.getItem("token");
  const [user1, setUser1] = useState("");
  const [refetch, setRefetch] = useState(0);
  const [showPopUp, setShowPopUp] = useState("");
  
  const SERVER_URL = "http://localhost:3001";
  // const SERVER_URL = "https://jobilee-server.vercel.app"

  // assigning user 1 as the logged-in user
  const isTokenAvailable = localStorage.getItem("token") != null;
  useEffect(() => {
    if (isTokenAvailable) {
      axios.post(SERVER_URL + "/home", { accessToken }).then((response) => {
        setUser1(response.data?.user);
        console.log("the logged in user is " + user1);
      });
    }
  }, []);
  useEffect(() => {
    if (user1?.id) {
      axios
        .get(SERVER_URL + `/getPendingConnection/${user1?.id}`)
        .then((response) => {
          setConnections(response.data.data);
          console.log("Mounted");
          console.log(user1.name);
          console.log(connections, "user connections");
        })
        .catch((error) => {
          console.error("Error fetching Connections in front-end:", error);
        });
    }
  }, [user1?.id, user1.name, refetch]);

  console.log(connections);

  const handleUpdate = async (id, status) => {
    // Do something with the form data, such as send it to a server

    const data = {
      status: status,
    };
    console.log(data);
    await axios
      .patch(SERVER_URL + `/connections/${id}`, data)
      .then((response) => {
        console.log(response);
        //If backend returns an error
        if (response.data.status) {
          setShowPopUp(response.data.message);
          setRefetch(refetch + 1);
          setTimeout(() => {
            setShowPopUp("");
          }, 3000);
        } else {
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 4000);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <NavBar></NavBar>

      <h1 id="job_title">Connection Requests</h1>
      <br />
      <div className="container">
        <table className="job-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Accept</th>
              <th>Deny</th>
            </tr>
          </thead>
          <tbody>
            {connections?.map((connection) => (
              <tr key={connection._id}>
                <td>
                  {connection.user2Name === user1?.name
                    ? connection.user1Name
                    : connection.user2Name}
                </td>
                <td>{connection.status}</td>
                <td className="message_td">
                  <button
                    onClick={() => handleUpdate(connection?._id, "completed")}
                    className="button-14"
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleUpdate(connection?._id, "rejected")}
                    className="button-14"
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link to="/Connections" className="myButton">
          Your Connections
        </Link>
      </div>
      {showPopUp && <div className="success-message popup">{showPopUp}</div>}
    </>
  );
}

export default PendingConnections;