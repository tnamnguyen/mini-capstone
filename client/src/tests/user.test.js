import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import User from "../components/user.js"

//To keep the rendering of pages clean
afterEach(cleanup);

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

jest.mock('axios')

test('user is loaded', () => {
    render(<BrowserRouter><User /></BrowserRouter>);
    const user = screen.getByTestId("profile_container");
    expect(user).toBeInTheDocument();   
});