import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/connections.scss';
   


function Connections () {
    const [users, displayUser] = useState([]);
    
    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"
    
    useEffect(() => {
      // Fetch all users from the backend API when the component mounts
      axios.get(SERVER_URL+ '/connections')
        .then(response => {
            displayUser(response.data);
            console.log(users, 'user data');
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }, []);
     

    return (
        <>
        <NavBar></NavBar>

    
        <div>
        
            <Link to="/addConnections" className="myButton" >add a connection</Link>
        </div>



    </>

    );
}

export default Connections