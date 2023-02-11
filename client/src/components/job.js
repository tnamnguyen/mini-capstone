import React from "react";
import { Link } from "react-router-dom";
import "../Styles/job.scss";

function Job({
  title,
  education,
  experience,
  tools,
  place,
  languages,
  description,
  ownerID,
}) {
  const passingObj = {
    passTitle: title,
    passEduc: education,
    passExp: experience,
    passTools: tools,
    passPace: place,
    passLang: languages,
    passDesc: description,
    passOID: ownerID,
  };
  return (
    <div className="container">
      <span style={{ fontWeight: "bold" }}>{title}</span>
      <span>{education}</span>
      <span>{experience}</span>
      <span>{place}</span>
      <Link
        to={{
          pathname: "/viewJob",
          state: {
            passingObj,
          },
        }}
      >
        <button>View Job</button>
      </Link>
    </div>
  );
}

export default Job;
