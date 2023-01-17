import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Send a request to the server to log the user in
        // If the login is successful, redirect the user to the home page
        // If the login fails, update the error state with the error message

        // Code Example:
        // axios.post('/api/login', {username, password})
        // .then(response => {
        //   // Handle successful login
        // })
        // .catch(error => {
        //   setError(error.response.data.message);
        // });
    };

    return (
        <div className="login-form">

            {error && <div className="error">{error}</div>}

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
            <button onClick={handleLogin}>Login</button>
            <Link to="/signup">Need an account?</Link>

        </div>
    );
}

export default Login;