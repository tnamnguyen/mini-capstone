import axios from "axios";
import React from "react";
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Connections,{user1} from "../components/Connections";
import NavBar from "../components/navBar.js"

jest.mock("axios");


//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

test('connections is loaded', () => {
    const connections = [{
        user1: 'eyad',
        user2: 'eyad2',
        status: 'completed'
    },
    {
        user1: 'nick',
        user2: 'fifa',
        status: 'completed'
    }    
]
    axios.post.mockResolvedValue({data: connections});
    render(<BrowserRouter><Connections /></BrowserRouter>);
    const conn = screen.getByTestId("connectionsTest");
    expect(conn).toBeInTheDocument();   
});
