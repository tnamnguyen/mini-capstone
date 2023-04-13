import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import NavBar from "../components/navBar.js"
import AdminListUsers from "../components/adminListUsers.js"

//To keep the rendering of pages clean
afterEach(cleanup);

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

jest.mock('axios')
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

test('admin list is loaded', () => {
    render(<BrowserRouter><AdminListUsers /></BrowserRouter>);
    const adminList = screen.getByTestId("adminListTest");
    expect(adminList).toBeInTheDocument();   
});