import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';
   

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
        
            <h1 id="job_title" >Your Connections</h1>
            <br />
            <div className="container">
            <table className="job-table">
            <thead>
               
                <tr>
                <th>Name</th>
            {/* <th>Email</th> */}
                </tr>
                
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    {/* <td>{user.email}</td> */}
                </tr>
                ))}
            </tbody>
            </table>
            
            </div>
            <Link to="/addConnections" className="myButton">add a connection</Link>
        </div>



    </>

    );
}

export default Connections