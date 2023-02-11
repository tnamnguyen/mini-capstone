import React from "react";
import NavBar from "./navBar";
import { Link } from "react-router-dom";

function ViewJob(props) {
  return (
    <div>
      <NavBar></NavBar>
      <h1>{}</h1>
      {/*<h2>{education}</h2> <h2>{experience}</h2>
      <h3>{tools}</h3> <h3>{place}</h3> <h3>{languages}</h3>
  <p>{description}</p>*/}
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
    </div>
  );
}

export default ViewJob;
