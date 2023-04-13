import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from 'axios'
import CreateJob from '../components/createJob'

jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

test('Create Job is loaded', () => {
    render(<BrowserRouter><CreateJob/></BrowserRouter>)
    const createjob = screen.getByTestId("createJob-1");
    expect(createjob).toBeInTheDocument();
})