import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import OTP from "../components/OTP.js"

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

test('otp is loaded', () => {
    render(<BrowserRouter><OTP /></BrowserRouter>);
    const otp = screen.getByTestId("otpcontainerTest");
    expect(otp).toBeInTheDocument();       
});