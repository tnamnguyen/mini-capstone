import React from "react";
import NavBar from "./navBar";
import yourJob from "./yourJob";

function YourJobs() {
  var rows = [];

  /*Code to grab info of user's ID goes here,
    Then grabs all info and passes it to the yourJob method, and pushes
    the job method to the rows array */

  rows.push(
    yourJob({
      title: "JobTest",
      education: "None",
      experience: "None",
      tools: "None",
      place: "Montreal",
      languages: "English, French",
      description: "Biography",
      ownerID: 1,
    })
  );
  return (
    <>
      <NavBar></NavBar>

      {rows}
    </>
  );
}

export default YourJobs;
