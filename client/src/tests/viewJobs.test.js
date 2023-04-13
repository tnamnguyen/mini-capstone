import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import ViewJob from "../components/viewJob.js"

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

test('view jobs is loaded', () => {
    render(<BrowserRouter><ViewJob /></BrowserRouter>);
    const containerOne = screen.getByTestId("containterTest");
    const containerTwo = screen.getByTestId("containterTwoTest");
    expect(containerOne).toBeInTheDocument();   
    expect(containerTwo).toBeInTheDocument(); 
});