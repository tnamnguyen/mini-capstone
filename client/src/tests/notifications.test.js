import React from "react";
import { BrowserRouter } from "react-router-dom"
import { render, screen, fireEvent, prettyDOM } from "@testing-library/react";
import '@testing-library/jest-dom';
import Notifications from "../components/notifications.js";
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

test('notifications is loaded', () => {
    render(<BrowserRouter><Notifications /></BrowserRouter>);
    const noti = screen.getByTestId("notificationsTest");
    expect(noti).toBeInTheDocument();   
});