import axios from "axios";
import React from "react";
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import '@testing-library/jest-dom';
import NavBar from "../components/navBar.js"
import Admin from "../components/admin.js";


jest.mock("axios");


//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

test('admin is loaded', () => {
    const admindata = {
        numofUser: 1,
        numofJob: 1 
    }
    
    axios.post.mockResolvedValue({data: admindata});
    render(<BrowserRouter><Admin /></BrowserRouter>);
    const admin = screen.getByTestId("welcomeTest");
    const adminStatsTest = screen.getByTestId("adminStatsTest");
    const adminFuncTest = screen.getByTestId("adminFuncTest");
    expect(admin).toBeInTheDocument();   
    expect(adminStatsTest).toBeInTheDocument(); 
    expect(adminFuncTest).toBeInTheDocument(); 
});