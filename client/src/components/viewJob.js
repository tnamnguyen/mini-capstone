import React from "react";
import NavBar from "./navBar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../Styles/viewJob.scss";

function ViewJob(props) {
  const location = useLocation();
  console.log(props, " props");
  console.log(location, " useLocation Hook");
  const data = location.state.data;

  return (
    <>
      <NavBar></NavBar>
      <div className="viewJob_container1">
        <h1>{data ? data.passTitle : "Go to Home"}</h1>
        <h2>Education Requirements: {data ? data.passEduc : "Oops"}</h2>{" "}
        <h2>Experience Requirements: {data ? data.passExp : "Oops"}</h2>
        <h3>Tools Needed/Used: {data ? data.passTools : "Oops"}</h3>{" "}
        <h3>Location of Job Site: {data ? data.passPlace : "Oops"}</h3>
        <h3>Languages Required: {data ? data.passLang : "Oops"}</h3>
      </div>
      <div className="extra">
        <h1>Description:</h1>
      </div>

      <div className="viewJob_container2">
        <h3>{data ? data.passDesc : "Oops"}</h3>
        <br></br>
      </div>
      <Link to="#">
        <button id="viewJob_save">Save</button>
      </Link>
      <Link to="/jobs">
        <button
          id="viewJob_apply" /*onClick={} backend method to apply goes here */
        >
          Apply
        </button>
      </Link>
    </>
  );
}

export default ViewJob;
