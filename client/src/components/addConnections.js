import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';

function AddConnections(){
    const [username,setName] = useState('');

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
                <input required type="text" value={username} onChange={(event) => setName(event.target.value)} />
                </label>
                
                <button type="submit">Submit</button>
               
            </form>

            </div>
       </div>
        </>
    );

}

export default AddConnections;