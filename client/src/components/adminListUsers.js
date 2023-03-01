import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/admin.scss';


function AdminListUsers(){

    let countUsers = 1;
    const [users, setUsers] = useState([]);

    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    function backToAdmin(){
        window.location.href = "/admin"
    }



    function assignAdmin(email){
        axios.post(SERVER_URL+ '/makeAdmin', {email})
        .then(response => {
            //setUsers(response.data);
        })
        .catch(error => {
            //console.error('Error fetching jobs:', error);
        });
 
    }
    function assignRegularUser(email){
        axios.post(SERVER_URL+ '/makeRegularUser', {email})
        .then(response => {
            //setUsers(response.data);
        })
        .catch(error => {
            //console.error('Error fetching jobs:', error);
        });
 
    }

    
  
    useEffect(() => {
      // Fetch all users from the backend API when the component mounts
      axios.get(SERVER_URL + '/adminListUsers')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
    }, []);



    
    return(
        <>
       
           
            <table className="job-table">
            <thead>
            
                <tr>
                <th>#</th>
                <th>UserName</th>
                <th>email</th>
                <th>Password</th>
                <th>Type</th>
                <th>Action</th>
                </tr>
                
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.id}>
                    <td>{countUsers++}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.type}</td>
                    <td>
                        <button onClick={() => assignAdmin(user.email)}>Make Admin</button>
                        <button onClick={() => assignRegularUser(user.email)}>Make Regular User</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div>Total number of users: {countUsers-1}</div>

            <br></br>
            <button className='admin_listUsers_goBack_button' onClick={backToAdmin}>Go Back</button>
            
        </>
        
    )
};

export default AdminListUsers;