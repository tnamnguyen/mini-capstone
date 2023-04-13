import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import axios from 'axios'
import NavBar from "../components/navBar.js"
import Home from "../components/home.js"

//To keep the rendering of pages clean
afterEach(cleanup);
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});


jest.mock('axios')

//Testing if main HTML component is loaded properly
test('HomePage is loaded', () => {
    const homedata = {
        isLoggedIn: true,
        isAdmin: false,
        user: {
            name: 'John Doe',
            email: 'john.doe@test.com',
            password: 'encryptedpassword',
            type: "regular_user"
        }
    }
    axios.post.mockResolvedValue({data: homedata});
    render(<Home></Home>)
    const home = screen.getByTestId("home_main_container");
    expect(home).toBeInTheDocument();   
});


