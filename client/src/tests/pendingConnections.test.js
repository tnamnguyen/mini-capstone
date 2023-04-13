import axios from "axios";
import React from "react";
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import '@testing-library/jest-dom';
import PendingConnections from "../components/pendingConnections";
import NavBar from "../components/navBar.js"

jest.mock("axios");
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));


//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});

test('pending connections is loaded', () => {
    render(<BrowserRouter><PendingConnections /></BrowserRouter>);
    const pendingconn = screen.getByTestId("pendingConnectionsTest");
    expect(pendingconn).toBeInTheDocument();   
});
