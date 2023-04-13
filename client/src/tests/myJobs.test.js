import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from "axios"
import MyJobList from "../components/myJobs"

afterEach(cleanup)

jest.mock('axios');
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));
  
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
    setTimeout(() => {
        const myjobs = screen.getByTestId("jobs-1");
        const title = screen.getByText('test');
        const experience = screen.getByText('experience')
        const location = screen.getByText('location')
        const description = screen.getByText('description')
        expect(myjobs).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(experience).toBeInTheDocument();
        expect(location).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    }, 3000)

});