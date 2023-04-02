import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import JobList from "../components/jobs.js"

//To keep the rendering of pages clean
afterEach(cleanup);

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

jest.mock('axios')

test('jobs is loaded', () => {
    render(<BrowserRouter><JobList /></BrowserRouter>);
    const jobs = screen.getByTestId("jobsTest");
    expect(jobs).toBeInTheDocument();       
});