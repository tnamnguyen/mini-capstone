import React from "react";
import NavBar from "./navBar";
import Job from "./job";

function YourJobs() {
  var rows = [];

  /*Code to grab info of user's ID goes here,
    Then grabs all info and passes it to the Job method, and pushes
    the job method to the rows array */

  return (
    <>
      <NavBar></NavBar>

      {rows}
    </>
  );
}

export default YourJobs;
