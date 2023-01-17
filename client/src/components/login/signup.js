import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        // Send a request to the server to sign the user up
        // If the signup is successful, redirect the user to the home page
        // If the signup fails, update the error state with the error message

        // Code Example:
        // axios.post('/api/signup', {username, email, password, passwordConfirm})
        // .then(response => {
        //   // Handle successful signup
        // })
        // .catch(error => {
        //   setError(error.response.data.message);
        // });
    };

    return (
        <div className="signup-form">

            {error && <div className="error">{error}</div>}

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
            <button onClick={handleSignup}>Sign Up</button>
            <Link to="/login">Already have an account?</Link>

        </div>
    );
}

export default Signup;
