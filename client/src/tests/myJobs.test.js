import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from "axios"
import MyJobList from "../components/myJobs"

afterEach(cleanup)

jest.mock('axios');

test('My Jobs List is loaded', () => {
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
    render(<BrowserRouter><MyJobList/></BrowserRouter>)
    const myjobs = screen.getByTestId("jobs-1");
    expect(myjobs).toBeInTheDocument();
});