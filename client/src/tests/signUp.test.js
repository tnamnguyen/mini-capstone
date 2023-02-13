import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import NavBar from "../components/navBar.js";
//import Signup from "../components/signup.js";

test('NavBar is loaded', () => {
    render(<NavBar/>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});


// test('SignUp form is loaded', () => {
//     render(<Signup/>);
//     const signUp = screen.getByTestId("signUp");
//     expect(signUp).toBeInTheDocument();   
// });