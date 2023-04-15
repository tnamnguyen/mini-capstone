import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from 'axios'
import EditProfile from '../components/editProfile'

jest.mock('axios');

// Testing the static document
test('Edit Profile is loaded', () => {
    const input = {
        user: {
            name: 'John Doe',
            email: 'john.doe@test.com',
            password: 'encryptedpassword',
            type: "regular_user"
        },
        education: 'Concordia',
        currentJob: 'Student',
        pastJob: 'Part Time',
        languages: 'English',
        bio: 'description'
    }

    axios.post.mockResolvedValue({data: input})

    render(<BrowserRouter><EditProfile/></BrowserRouter>)
    const editprofile = screen.getByTestId("container");
    expect(editprofile).toBeInTheDocument();
})