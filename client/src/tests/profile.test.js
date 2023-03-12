import {render, screen, cleanup, waitFor} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import Profile from "../components/profile.js"

afterEach(cleanup)

test('Profile is loaded', () => {
    render(<BrowserRouter><Profile></Profile></BrowserRouter>)
    const profile = screen.getByTestId("profile_container");
    expect(profile).toBeInTheDocument();
});