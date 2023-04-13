import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import axios from 'axios'
import EditProfile from '../components/editProfile'

jest.mock('axios');
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

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

    render(<BrowserRouter><EditProfile /></BrowserRouter>)
    setTimeout(function(){
        const name = screen.getByText("John Doe");
        const editprofile = screen.getByTestId("container");
        expect(editprofile).toBeInTheDocument();
        expect(name).toBeInTheDocument();
    }, 3000)
})