import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/notifications.scss";

function Notifications() {
  
  const [notifications, setNotifications] = useState([]);
  
  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const accessToken = localStorage.getItem("token")
  
  


  useEffect(() => {
    // Fetch all jobs from the backend API when the component mounts
    axios
      .post(SERVER_URL + "/getNotifications", {accessToken})
      .then((response) => {
        var test = response.data.notifications
        console.log("asjdashk")
        notifications.forEach(function(entry) {
          console.log("assds")
          console.log(entry);
        });
        setNotifications(response.data)
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);    // Refresh the table when the buttonClicked state changes


  function deleteNotification(id)
  {
    console.log("deleting " + id)
    axios
      .post(SERVER_URL + "/deleteNotification", {accessToken, notification_id: id})
      .then((response) => {
      })
      .catch((error) => {
        console.error("Error deleting the  notification:", error);
      });
  }

  

  // Call to remove saved job
  // async function removeJob(job_id){
  //   clearTimer();
  //   console.log('remove button was clicked')
  //   await axios.post(SERVER_URL + '/removejobApplication', {job_id, accessToken})
  //   .then(response => {
  //     setRemoveSuccess(response.data.message)
  //     setRemovedJobId(job_id);
  //     //await new Promise(resolve => setTimeout(resolve, 5000));
  //     const timer = setTimeout(() => {
  //       setRemoveSuccess("");
  //       setRemovedJobId(null);
  //       setRender(true);
  //     }, 3000);
     
     
  //     timerRef.current = timer;
      
  //   })
  //   if(jobs.length === 1){
  //     setJobs([])
  //   }
  //   else{
  //     setButtonClicked(!buttonClicked)
  //   }
  // };

   

    // Hold a reference to the timer
    const timerRef = useRef(null);

    // Reset the timer when the button is pressed
    function clearTimer() {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  
  return (
    <div data-testid="jobs-1">
      <NavBar></NavBar>

      <div>
        <h1 id="job_title">Notifications</h1>
        <br />
        <div className="container">
          <table className="job-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>message</th>
                <th>favorite</th>
                <th>Mark as read</th>
                <th>Action</th>
                <th>Remove Button</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((noti) => (
                <tr key={noti.id}>
                  <td>{noti.time_stamp}</td>
                  <td>{noti.message}</td>
                  <td>{noti.status}</td>
                  <td>
                  <button onClick={() => deleteNotification(noti._id)} id="notification_trash_button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                  </td>
              
                  
                  
            
             
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/jobs" className="myButton">
          See All Notifications
        </Link>
      </div>
    </div>
  );}


export default Notifications;
