import React from 'react';
import '../Styles/admin.scss';
import NavBar from './navBar';

function admin(){

    function seeListOfUsers(){
        window.location.href = "/adminListUsers"
    }

    return(
        <>
            <NavBar></NavBar>
            <div>
                <h1>Welcome to admin page</h1>
                <button onClick={seeListOfUsers}>List of Users</button>
            </div>
           
        </>
        
    )
};

export default admin;