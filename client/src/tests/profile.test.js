import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import Profile from "../components/profile.js";

jest.mock('axios');
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

// describe('Profile component', () => {
//   it('should set the state variables correctly when the axios call is successful', async () => {
//     const mockResponse = {
//       profileExists: 'True',
//       user: {
//         name: 'John Doe',
//       },
//       education: 'B.S. in Computer Science',
//       currentJob: 'Software Engineer',
//       pastJob: 'Web Developer',
//       languages: 'JavaScript, Python',
//       bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     };

//     axios.post.mockResolvedValue({ data: mockResponse });

//     const { getByTestId } = render(<BrowserRouter><Profile /></BrowserRouter>);

//     setTimeout(() => {
//             expect(getByTestId('profile_greeting')).toHaveTextContent('Good Night, John Doe');
//             expect(getByTestId('profile_education')).toHaveTextContent('Education: B.S. in Computer Science');
//             expect(getByTestId('profile_current_job')).toHaveTextContent('Current Job: Software Engineer');
//             expect(getByTestId('profile_past_job')).toHaveTextContent('Past Job: Web Developer');
//             expect(getByTestId('profile_languages')).toHaveTextContent('Languages: JavaScript, Python');
//             expect(getByTestId('profile_bio')).toHaveTextContent('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
//     }, 3000)
//   });
// });


  

test('Profile is loaded', () => {
    render(<BrowserRouter><Profile></Profile></BrowserRouter>)
    const profile = screen.getByTestId("profile_container");
    expect(profile).toBeInTheDocument();
});