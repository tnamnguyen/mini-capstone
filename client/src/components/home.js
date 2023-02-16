import React from 'react';
import NavBar from './navBar';
import '../Styles/home.scss';

function Home() {

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
                        <text>UserName</text><br></br>
                        <text>Bio</text><br></br>
                        <text>Who viewed your profile: 34</text><br></br>
                        <text>Total Connections: 12</text><br></br>
                    </div>
                </div>

                {/* Middle element on the page */}
                <div class='home_posts'>
                    <div>
                        <text>User Likes this</text><br></br>
                        <text>User got a new job</text><br></br>
                        <text>User update</text><br></br>
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