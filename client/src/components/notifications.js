import React, { useState } from "react";
import Moment from 'moment';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import NavBar from "./navBar";
import "../Styles/notifications.scss";

function Notifications() {
  //const formatDate = Moment().format('DD-MM-YYYY HH:mm')
  
  const [notifications, setNotifications] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [message, setMessage] = useState('')
  
  const SERVER_URL = process.env.REACT_APP_SERVER_URL

  const accessToken = localStorage.getItem("token")
  
  


  useEffect(() => {
    setMessage("")
    setRefresh(false)
    // Fetch all jobs from the backend API when the component mounts
    axios
      .post(SERVER_URL + "/getNotifications", {accessToken})
      .then((response) => {
        setNotifications(response.data)
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [refresh]);    // Refresh the table when the buttonClicked state changes


  function deleteNotification(id)
  {
    console.log("deleting " + id)
    axios
      .post(SERVER_URL + "/deleteNotification", {accessToken, notification_id: id})
      .then((response) => {
        setMessage(response.data)
        setTimeout(()=>{
          setMessage("")
      }, 3000)
      })
      .catch((error) => {
        console.error("Error deleting the  notification:", error);
      });

      setRefresh(true)
  }

  function makeFavorite(id)
  {
    console.log("make favorite")
    //call API to update the favorite status
    axios
      .post(SERVER_URL + "/makeFavoriteNotification", {accessToken, notification_id: id})
      .then((response) => {
        setMessage(response.data)
        setTimeout(()=>{
          setMessage("")
      }, 3000)
      })
      .catch((error) => {
        console.error("Error marking the notification as favorite", error);
      });

      setRefresh(true)
  }

  function unmakeFavorite(id)
  {
    //call API to update the favorite status
    axios
      .post(SERVER_URL + "/unmakeFavoriteNotification", {accessToken, notification_id: id})
      .then((response) => {
        setMessage(response.data)
        setTimeout(()=>{
          setMessage("")
      }, 3000)
      })
      .catch((error) => {
        console.error("Error marking the notification as favorite", error);
      });

      setRefresh(true)
  }


  function favoriteIcon(favorite, id)
  {
    console.log("favorite:" + favorite)
    //If favorite
    if (favorite)
    {
      return(
        <button id="notification_favorite_button" onClick={() => unmakeFavorite(id)}>
          <svg class="star-icon-yellow" viewBox="0 0 24 24">
            <path d="M12.52,4.4c0.4,-1.01 1.56,-1.01 1.96,0l1.67,4.25l4.72,0.34c1.11,0.08 1.56,1.43 0.72,2.13l-3.79,3.1l1.42,4.48c0.33,1.04 -0.86,1.91 -1.77,1.3l-3.95,-2.7l-3.95,2.7c-0.91,0.62 -2.1,-0.26 -1.77,-1.3l1.42,-4.48l-3.79,-3.1c-0.84,-0.69 -0.39,-2.05 0.72,-2.13l4.72,-0.34l1.67,-4.25Z"></path>
          </svg>
        </button>
      )
    }
    else
    {
      return(
        <button id="notification_favorite_button" onClick={() => makeFavorite(id)}>
          <svg class="star-icon" viewBox="0 0 24 24">
            <path d="M12.52,4.4c0.4,-1.01 1.56,-1.01 1.96,0l1.67,4.25l4.72,0.34c1.11,0.08 1.56,1.43 0.72,2.13l-3.79,3.1l1.42,4.48c0.33,1.04 -0.86,1.91 -1.77,1.3l-3.95,-2.7l-3.95,2.7c-0.91,0.62 -2.1,-0.26 -1.77,-1.3l1.42,-4.48l-3.79,-3.1c-0.84,-0.69 -0.39,-2.05 0.72,-2.13l4.72,-0.34l1.67,-4.25Z"></path>
          </svg>
        </button>
      )
    }
  }


  function action(action)
  {
    if(action != "N/A"){
      if(action == "/appliedJobs")
      {
        return(
          <Link to="/appliedJobs"><button class="" href="/appliedJobs">View Applied Jobs</button></Link>
        )
      }

      else if(action == "/jobs")
      {
        return(
          <Link to="/jobs"><button class="" href="/jobs">View All Jobs</button></Link>
        )
      }
    }
  }
  

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
          <table className="job-table" data-testid="notificationsTest">
            <thead>
              <tr>
                <th>Time</th>
                <th>message</th>
                <th>Add to favorite</th>
                <th>Delete Notification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((noti) => (
                <tr key={noti.id}>
                  <td>{noti.time_stamp}</td>
                  <td>{noti.message}</td>
                  <td>
                    {favoriteIcon(noti.favorite, noti._id)}
                  </td>
                  <td>
                    <button onClick={() => deleteNotification(noti._id)} id="notification_trash_button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </td>
                  <td>
                    {action(noti.action)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div id="notifications_remove_message">{message}</div>
      </div>
    </div>
  );}


export default Notifications;
