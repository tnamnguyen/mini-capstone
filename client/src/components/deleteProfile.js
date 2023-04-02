import React from 'react';
import '../Styles/log-out.scss';

function DeleteProfile(){

    //Delete the token stored locally
    localStorage.removeItem("token")


    //Redirect to main page
    setTimeout(()=>{
        window.location.href = "/"
    }, 3000)


    return(
        <>
            <div className='log_out' data-testid="deleteProfileTest">
                <h1 className='log_out_title'>Profile Deleted, redirecting to home page...</h1>
            </div>
        </>
    )
};

export default DeleteProfile;