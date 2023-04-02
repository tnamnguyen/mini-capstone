import React, { useState , } from 'react';
import {  useEffect  } from 'react';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/admin.scss';


function AdminListUsers(){

    //To count how many users
    let countUsers = 1

    const [users, setUsers] = useState([]);

    const SERVER_URL = process.env.REACT_APP_SERVER_URL


    //To go bak to admin page when button is pressed
    function backToAdmin(){
        window.location.href = "/admin"
    }


    //To assign User as an admin
    function assignAdmin(email){
        axios.post(SERVER_URL+ '/admin_makeAdmin', {email})
        window.location.href = "/adminListUsers"
    }

    //To assign User as a regular user
    function assignRegularUser(email){
        axios.post(SERVER_URL+ '/admin_makeRegularUser', {email})
        window.location.href = "/adminListUsers"
    }

    
  
    useEffect(() => {
      // Fetch all users from the backend API when the component mounts
      axios.get(SERVER_URL + '/admin_listUsers')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
        });
    }, []);



    
    return(
        <>
            <NavBar></NavBar>
            <h1 className='admin_listUsers_title'>List Of Registered Users</h1>
            <table className="admin_listUsers_table" data-testid="adminListTest">
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
                        <button onClick={() => assignAdmin(user.email)} className='admin_listUsers_makeAdmin_button'>Make Admin</button>
                        <button onClick={() => assignRegularUser(user.email)} className='admin_listUsers_makeRegular_button'>Make Regular</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            <div className='admin_listUsers_totalNumOfUsers' >Total number of users: {countUsers-1}</div>

            <br></br>
            <button className='admin_listUsers_goBack_button' onClick={backToAdmin}>Go Back</button>
            
        </>
        
    )
};

export default AdminListUsers;