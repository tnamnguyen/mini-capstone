import {render, screen, cleanup} from "@testing-library/react"
import '@testing-library/jest-dom'
import NavBar from "../components/navBar.js"
import Home from "../components/home.js"

//To keep the rendering of pages clean
afterEach(cleanup);

//Testing if the navbar is loaded properly
test('NavBar is loaded', () => {
    render(<NavBar></NavBar>);
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();   
});


//Testing if main HTML component is loaded properly
test('HomePage is loaded', () => {
    render(<Home></Home>)
    const home = screen.getByTestId("home_main_container");
    expect(home).toBeInTheDocument();   
});


