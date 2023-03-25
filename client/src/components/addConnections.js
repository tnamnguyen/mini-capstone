import React, { useState } from 'react';
import {  useEffect  } from 'react';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/connections.scss';

function AddConnections(){
    const [users, displayUser] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const accessToken = localStorage.getItem("token")
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");

    const SERVER_URL = "http://localhost:3001"
    // const SERVER_URL = "https://jobilee-server.vercel.app"

    // assigning user 1 as the logged-in user
    const isTokenAvailable = (localStorage.getItem("token") != null)
    if(isTokenAvailable){
        axios.post(SERVER_URL + '/home', {accessToken})
        .then(response => {
            setUser1(response.data.user.name)
        })
    }
    
 
    // printing the users
    useEffect(() => {
        // Fetch all users from the backend API when the component mounts
        axios.get(SERVER_URL+ '/addConnections')
          .then(response => {
              displayUser(response.data);
              console.log(users, 'user data');
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      }, []);


       //console.log(user1) //shows current user logged in
       //console.log(user2)
        
        const handleSubmit = async () => {
                // Do something with the form data, such as send it to a server
                console.log({ user1, user2 });

                await axios.post(SERVER_URL + '/addConnections', {user1, user2 })
                .then(response => {
                    //If backend returns an error
                    if(response.data.isError == "True"){
                        
                    }
          
                    //If backend returns success
                    if(response.data.isError == "False"){
                        
          
                        setTimeout(()=>{
                            window.location.href = "http://localhost:3000/"
                        }, 4000)
                    }
                    
                })
                .catch(error => {
                   
                });                
           
          };


    return(
        <>
            <NavBar></NavBar>
            <div className="createjob-form" data-testid="createJob-1">
            <div className="createjob-container">
            <h2 id="createjob_title">Add Connection</h2>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <label>
                Username
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(event)=> {setInputValue(event.target.value); } }
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
                else if(typeof user.name === 'string' && inputValue.toLowerCase().includes(user.name.toLowerCase())){
                    return user
                }})
                .map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td >
                        <button className='button-14' type ='' onClick={() => setUser2(user.name)}>Add</button>
                    </td>
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