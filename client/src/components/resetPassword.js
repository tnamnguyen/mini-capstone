import React, { useState, useEffect } from 'react';
import { Link,useLocation  } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';


function ResetPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [signUpStatus_success, setSignUpStatus_success] = useState('');
    const [signUpStatus_err, setSignUpStatus_err] = useState('');

    const SERVER_URL = process.env.REACT_APP_SERVER_URL


    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const emailFromUrl = query.get('email');

  useEffect(() => {
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [emailFromUrl]);

    const ResetPassword = async () => {
        // Send a request to the server to change the password the user up
        // If the password reset is successful, redirect the user to the login page
        // If it fails, update the error state with the error message

        
        
        await axios.post(SERVER_URL + '/reset', {email, password, passwordConfirm})
            .then(response => {
                //If backend returns an error
                if(response.data.isError == "True"){
                    setSignUpStatus_err(response.data.message)
                    setSignUpStatus_success('')
                }

                //If backend returns success
                if(response.data.isError == "False"){
                    setSignUpStatus_err('')
                    setSignUpStatus_success(response.data.message)

                    setTimeout(()=>{
                        window.location.href = "/login"
                    }, 4000)
                }
                
            })
            .catch(error => {
                setError(error.data.message);
            });
       
    };

    return (
        <>
           
            <NavBar></NavBar>
           
            <div className="signup-form" data-testid="signUp">

                {error && <div className="error">{error}</div>}
                <div className="signup-container">
                    <h2 id='signup_title'>Reset Password</h2>
                    <div>

                    <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            readOnly
                        />
                    
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <button id='signup_button' onClick={ResetPassword}>Change Password</button>
                    <Link to="/login">Already have an account?</Link>

                    <div className='signUpStatus_err'>{signUpStatus_err}</div>
                    <div className='signUpStatus_success'>{signUpStatus_success}</div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
