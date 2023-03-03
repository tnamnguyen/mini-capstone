import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';
   


function Notifications () {
    const [notifications, displayNotifications] = useState([]);
    
    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

    useEffect(() => {
      // Fetch all jobs from the backend API when the component mounts
      axios.get(SERVER_URL+ '/notifications')
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
                <th>Name</th>
            {/* <th>Email</th> */}
                </tr>
                
            </thead>
            <tbody>
                {notifications.map(notif => (
                <tr key={notif.id}>
                    <td>{notif.name}</td>
                    {/* <td>{user.email}</td> */}
                </tr>
                ))}
            </tbody>
            </table>


        </>

    );
}

export default Notifications