import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import NavBar from './navBar';
import '../Styles/sign-up.scss';


function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const SERVER_URL = "//localhost:3001"

    const handleSignup = async () => {

        // Send a request to the server to sign the user up
        // If the signup is successful, redirect the user to the home page
        // If the signup fails, update the error state with the error message

        // Code Example:
        if (password===passwordConfirm) {
            await axios.post(SERVER_URL + '/signup', {username, email, password})
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    setError(error.response.data.message);
                });
        } else {
            // passwords don't match
            // ...
        }

    };

    return (
        <>
            <NavBar></NavBar>
            <div className="signup-form">

            {error && <div className="error">{error}</div>}
            <div className="signup-container">
                <h2 id='signup_title'>Sign Up</h2>
                <div>
                    <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
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
                <button id='signup_button' onClick={handleSignup}>Sign Up</button>
                <Link to="/login">Already have an account?</Link>
            </div>

            </div>

        </>
    );
}

export default Signup;
