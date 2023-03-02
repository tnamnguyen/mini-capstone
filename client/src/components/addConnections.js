import React, { useState } from 'react';
import {  useEffect  } from 'react';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';

function AddConnections(){
    const [users, displayUser] = useState([]);
    const [inputValue, setInputValue] = useState('');
    

    // printing the users
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

    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

    return(
        <>
            <NavBar></NavBar>
            <div className="createjob-form" data-testid="createJob-1">
            <div className="createjob-container">
            <h2 id="createjob_title">Add Connection</h2>
            <br />
            <br />
            <form >
                <label>
                Username
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(event)=> {setInputValue(event.target.value); }}
                />
                
                </label>
                
                

                {/*  printing the users in table */}
                <div className="container">
            <table className="job-table">
            <thead>
                <tr>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                
            {users.filter((user) => {if (inputValue === ''){
                return user} 
                else if(typeof user.name === 'string' && inputValue.toLowerCase().includes(user.name)){

                    return user
                }})
                .map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <button id='addToConnections' link=""> 
                        Add
                    </button>
                </tr>
                
                    
                
                ))}
                

                
            </tbody>
            </table>
            
            </div>
               
            </form>

            </div>
       </div>
        </>
    );

}

export default AddConnections;