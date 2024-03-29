import React from 'react';
import '../Styles/log-out.scss';

function Logout(){

    //Delete the token stored locally
    localStorage.removeItem("token")


    //Redirect to main page
    setTimeout(()=>{
        window.location.href = "/"
    }, 3000)


    return(
        <>
            <div className='log_out' data-testid="logout">
                <h1 className='log_out_title'>Logging Out...</h1>
            </div>
        </>
    )
};

export default Logout;