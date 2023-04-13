import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import ForgotPassword from "../components/forgotPassword"

jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

// Testing the static document
test('Forgot Password is loaded', () => {
    render(<BrowserRouter><ForgotPassword/></BrowserRouter>)
    const forgotpw = screen.getByTestId("login-form");
    expect(forgotpw).toBeInTheDocument();
})