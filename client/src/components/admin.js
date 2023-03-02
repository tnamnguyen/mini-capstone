import React, { useState } from 'react';
import '../Styles/admin.scss';
import NavBar from './navBar';
import axios from "axios";

function Admin(){

    const [numOfUsers_stat, setNumOfUsers_stat] = useState('...');
    const [numOfJobs_stat, setNumOfJobs_stat] = useState('...');
    
    const SERVER_URL = process.env.REACT_APP_SERVER_URL

    //Getting the statistics information from back end
    axios.get(SERVER_URL + '/admin')
    .then(response => {
        setNumOfUsers_stat(response.data.numOfUsers)
        setNumOfJobs_stat(response.data.numOfJobs)
    })

    //Functions directing to other pages
    function seeListOfUsers(){
        window.location.href = "/adminListUsers"
    }

    return(
        <>
            <NavBar></NavBar>
            
            <h1 className='admin_title'>Welcome to admin page</h1>

            <div className='admin_stats'>
                <h2 className='admin_stats_main_title'>Platform Statistics</h2>
                <h4 className='admin_stats_sub_title'>Total number of registered users: {numOfUsers_stat}</h4>
                <h4 className='admin_stats_sub_title'>Total number of available jobs: {numOfJobs_stat}</h4>
            </div>

            <div className='admin_functionalities'>
                <h2 className='admin_functionalities_main_title'>Admin Functionalities</h2>
                <h4 className='admin_functionalities_sub_title'>To see list of of all platform users:</h4>
                <button onClick={seeListOfUsers} className='admin_functionalities_button'>List of Users</button>
            </div>
 
        </>
    )
};

export default Admin;