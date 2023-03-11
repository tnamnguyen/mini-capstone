import React, {useEffect, useState} from 'react';
import NavBar from './navBar';
import axios from "axios";
import '../Styles/home.scss';

function Home() {

    //Check if User is logged-in
    const SERVER_URL = process.env.REACT_APP_SERVER_URL
    const accessToken = localStorage.getItem("token")
    axios.post(SERVER_URL + '/home', {accessToken})
    .then(response => {
        setUserName(response.data.user.name)
    })

    useEffect(() => {
        // Fetch all jobs from the backend API when the component mounts
        axios.get(SERVER_URL+ '/jobs')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    //Variable to diplay on page if user is logged-in
    const [userName, setUserName] = useState('UserName');
    const [jobs, setJobs] = useState([]);

    return (
        <>
            <NavBar></NavBar>
            <div class='home_main_container' data-testid="home_main_container">

                {/* Left element on the page */}
                <div class='home_main_profile'>
                    <div>
                        <div class='profile_pic'>
                            <img src={require('../assets/images/profile.png')} width='140' height='140' alt='profile pic' id='home_profile_pic'></img>
                        </div>
                        <div>{userName}</div><br></br>
                        <text>Bio</text><br></br>
                        <br>{jobs.title}</br>
                        <text>Who viewed your profile: 34</text><br></br>
                        <text>Total Connections: 12</text><br></br>
                        {jobs.map(job => (
                                <div>{job.title}</div>
                        ))}
                    </div>
                </div>

                {/* Middle element on the page */}
                <div class='home_posts'>
                    <div>
                        <text>{userName} Likes this</text><br></br>
                        <text>{userName} got a new job</text><br></br>
                        <text>{userName} update</text><br></br>
                    </div>
                </div>

                {/* Right element on the page */}
                <div class='home_news'>
                    <div>
                        <text>Jubilee News #1</text><br></br>
                        <text>Jubilee News #2</text><br></br>
                        <text>Jubilee News #3</text><br></br>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home