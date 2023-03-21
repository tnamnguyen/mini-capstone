import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/connections.scss';
   


function Connections () {
    const [connections, setConnections] = useState([]);

    
    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

    const accessToken = localStorage.getItem("token")                
    const isTokenAvailable = (accessToken != null)

    useEffect(() => {
      // checking to see if user is logged in
      //if(isTokenAvailable){
      // Fetch all users from the backend API when the component mounts
      axios.get(SERVER_URL+ '/connections', {accessToken})
        .then(response => {
            setConnections(response.data);
            console.log(connections, 'user connections');
        })
        .catch(error => {
          console.error('Error fetching users connections:', error);
        });
    }, []);
     

    return (
        <>
        <NavBar></NavBar>

        <h1 id="job_title" >Your connections</h1>
            <br />
            <div className="container">
            <table className="job-table">
            <thead>
               
                <tr>
                <th>Name</th>
                </tr>
                
            </thead>
             <tbody>
                {connections.map(connection => (
                <tr key={connection.id}>
                    <td>{connection.user2}</td>
                </tr>
                ))}
            </tbody> 
            </table>
            
            </div>
        <div>
            <Link to="/addConnections" className="myButton" >add a connection</Link>
        </div>

    </>

    );
}

export default Connections