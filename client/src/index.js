import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import Login from "./components/login/login";
import Signup from "./components/login/signup";
import Home from "./components/home";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
