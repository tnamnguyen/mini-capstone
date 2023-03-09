import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';
   


function Notifications () {
    const [notifications, displayNotifications] = useState([]);
    
    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

    //Creste a new notification (for testing purposes)
    const accessToken = localStorage.getItem("token")
    axios.post(SERVER_URL + '/createNotification', {accessToken, referenceID:"test", type:"requst"})

    useEffect(() => {
      // Fetch all jobs from the backend API when the component mounts
      
      axios.post(SERVER_URL+ '/notifications', {accessToken})
        .then(response => {
            displayNotifications(response.data);
        })
        .catch(error => {
            console.error('Error fetching notifications:', error);
        });
    }, []);
  
    

    return (
        <>
        <NavBar></NavBar>

        <h1>FRONT END TO BE IMPLEMENTED</h1>


        <table className="job-table">
            <thead>
               
                <tr>
                <th>user</th>
                <th>id</th>
                <th>message</th>
                <th>status</th>
                </tr>
                
            </thead>
            <tbody>
                {notifications.map(notif => (
                <tr key={notif.id}>
                    <td>{notif.userID}</td>
                    <td>{notif.id}</td>
                    <td>{notif.message}</td>
                    <td>{notif.status}</td>
                </tr>
                ))}
            </tbody>
            </table>


        </>

    );
}

export default Notifications