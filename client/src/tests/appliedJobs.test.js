import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import AppliedJobList from "../components/appliedJobs.js"

//To keep the rendering of pages clean
afterEach(cleanup);

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

jest.mock('axios')

test('applied jobs is loaded', () => {
    render(<BrowserRouter><AppliedJobList /></BrowserRouter>);
    const appliedJobs = screen.getByTestId("appliedJobsTest");
    expect(appliedJobs).toBeInTheDocument();   
});