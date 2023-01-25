import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const SERVER_URL = "http://localhost:3001"

    const handleLogin = async () => {

        // Send a request to the server to log the user in
        // If the login is successful, redirect the user to the home page
        // If the login fails, update the error state with the error message
        //
        // Code Example:
        await axios.post(SERVER_URL + '/login', {username, password})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    };

    return (
        <div className="login-form">

            {error && <div className="error">{error}</div>}
            <div className="login-container">
                <h1>Log In</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
                <Link to="/signup">Need an account?</Link>
            </div>


        </div>
    );
}

export default Login;