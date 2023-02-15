import React from "react";
import { Link } from "react-router-dom";
import "../Styles/job.scss";
import { useState } from "react";

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
    passPlace: place,
    passLang: languages,
    passDesc: description,
    passOID: ownerID,
  };

  const [data] = useState(passingObj);

  return (
    <div className="container">
      <span style={{ fontWeight: "bold" }}>{title}</span>
      <span>{education}</span>
      <span>{experience}</span>
      <span>{place}</span>

      <Link to="/viewJob" state={{ data: data }}>
        <button>View Job</button>
      </Link>
      <Link to="/editJob">
        <button>Edit Job</button>
      </Link>
    </div>
  );
}

export default Job;
