import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import Logout from "../components/logout"

jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

test('Testing the static document logout', () => {
    render(<BrowserRouter><Logout/></BrowserRouter>)
    expect(screen.getByTestId("logout")).toBeInTheDocument();

})