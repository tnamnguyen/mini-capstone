import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import ResetPassword from "../components/resetPassword";


test('Reset Password is loaded', () => {
    render(<BrowserRouter><ResetPassword/></BrowserRouter>)
    const reset = screen.getByTestId("signUp");
    expect(reset).toBeInTheDocument();
})