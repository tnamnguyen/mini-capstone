import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import { act } from 'react-dom/test-utils';
import DeleteProfile from "../components/deleteProfile.js"

//To keep the rendering of pages clean
afterEach(cleanup);

jest.mock('axios')
jest.mock('reactstrap', () => ({
    Button: jest.fn().mockReturnValue('MockButton'),
  }));

beforeAll(() => {
    jest.useFakeTimers();
});

test('delete profile is loaded', () => {
    render(<BrowserRouter><DeleteProfile /></BrowserRouter>);
    const deleteProfileTest = screen.getByTestId("deleteProfileTestTest");
    expect(deleteProfileTest).toBeInTheDocument();   
    act(() => {
        jest.runOnlyPendingTimers();
    });
});