import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from 'axios'
import EditJob from '../components/editJob'

jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

test('Edit Job is loaded', () => {
    render(<BrowserRouter><EditJob/></BrowserRouter>)
    const editjob = screen.getByTestId("createjob-form");
    expect(editjob).toBeInTheDocument();
})