import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/connections.scss';
   


function Connections () {
    const [connections, setConnections] = useState([]);
    const accessToken = localStorage.getItem("token")
    const [user1, setUser1] = useState("");

    
    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

       // assigning user 1 as the logged-in user
       const isTokenAvailable = (localStorage.getItem("token") != null)
       if(isTokenAvailable){
           axios.post(SERVER_URL + '/home', {accessToken})
           .then(response => {
               setUser1(response.data.user.name)
              console.log('the logged in user is '+user1)
           })
       }


    // useEffect(() => {
    //   // checking to see if user is logged in
    //   //if(isTokenAvailable){
    //   // Fetch all users from the backend API when the component mounts
    //   axios.get(SERVER_URL+ '/connections', {accessToken})
    //     .then(response => {
    //         setConnections(response.data);
    //         console.log(connections, 'user connections');
    //     })
    //     .catch(error => {
    //       console.error('Error fetching users connections:', error);
    //     });
    // }, []);
    useEffect(() => {
        axios.get(SERVER_URL+ '/Connections')
          .then(response => {
              setConnections(response.data);
              console.log('Mounted');
              console.log(user1.name)
              console.log(connections, 'user connections');
          })
          .catch(error => {
            console.error('Error fetching Connections in front-end:', error);
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
                {connections.map((connection) => {
                    if(user1 === connection.user1 ){
                        return(
                            <tr key={connection._id}>
                            <td>{connection.user2}</td>
                            <td className='message_td'>
                                <button onClick=''  className='button-14'>Message</button>
                            </td>
                            <td >
                                <button onClick=''  className='button-14'>Delete</button>
                            </td>
                        </tr>
                        )
                    }
                    return null;
                })}

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