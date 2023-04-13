import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from "axios"
import SavedJobList from "../components/savedJobs"

afterEach(cleanup)

jest.mock('axios');
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

test('Saved Jobs List is loaded', () => {
    const jobs = [{
        title: 'test',
        experience: 'experience',
        location: 'location',
        description: 'description',
    },
    {
        title: 'test2',
        experience: 'exp',
        location: 'loc',
        description: 'desc',
    }    
]
    axios.post.mockResolvedValue({data: jobs});
    render(<BrowserRouter><SavedJobList/></BrowserRouter>)
    const savedjobs = screen.getByTestId("jobs-1");
    expect(savedjobs).toBeInTheDocument();
});