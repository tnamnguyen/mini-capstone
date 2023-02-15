import React, { useState } from "react";
import NavBar from "./navBar";
import "../Styles/edit_job.scss";

function EditJob() {
  //HTML Forms that appear under each field when the "Edit" button is pressed
  const [editTitle, setEditTitle] = useState(false);
  const [editJobEducation, setEditJobEducation] = useState(false);
  const [editExperience, setEditExperience] = useState(false);
  const [editTools, setEditTools] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editLanguage, setEditLanguage] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  //Variables holding the values of different fields
  const [title, setTitle] = useState("Title");
  const [education, setEducation] = useState("JobEducation");
  const [experience, setExperience] = useState("Experience");
  const [tools, setTools] = useState("Tools");
  const [location, setLocation] = useState("Location");
  const [language, setLanguage] = useState("Language");
  const [description, setDescription] = useState("Description");

  return (
    <>
      <NavBar></NavBar>

      <div class="edit_job_container1">
        <div class="edit_job_container2">
          {/* ********** Title Element ********** */}
          <div class="edit_job_greeting">
            Title: {title}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editTitle && (
              <form>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  onClick={() => setEditTitle(!editTitle)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Education Element ********** */}
          <div class="edit_job_education">
            Education: {education}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editJobEducation && (
              <form>
                <input
                  type="text"
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                <button
                  onClick={() => setEditJobEducation(!editJobEducation)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Experience Element ********** */}
          <div class="edit_job_past_job">
            Experience: {experience}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editExperience && (
              <form>
                <input
                  type="text"
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <button
                  onClick={() => setEditExperience(!editExperience)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Tools Element ********** */}
          <div class="edit_job_current_job">
            Tools: {tools}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editTools && (
              <form>
                <input
                  type="text"
                  required
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                />
                <button
                  onClick={() => setEditTools(!editTools)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Location Element ********** */}
          <div class="edit_job_location">
            Location: {location}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editLocation && (
              <form>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  onClick={() => setEditLocation(!editLocation)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Language Element ********** */}
          <div class="edit_job_languages">
            Languages: {language}
            <button
              onClick={() => setEditTitle(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editLanguage && (
              <form>
                <input
                  type="text"
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
                <button
                  onClick={() => setEditLanguage(!editLanguage)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Description Element ********** */}
          <div class="edit_job_bio">
            <label id="edit_bio_title">Bio</label>
            <p id="edit_bio_text">{description}</p>
            <button
              onClick={() => setEditDescription(!editTitle)}
              id="edit_job_edit_button"
            >
              <img
                src={require("../assets/images/edit.png")}
                width="30"
                height="30"
                alt="profile pic"
              ></img>
            </button>
            {editDescription && (
              <form>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  onClick={() => setEditDescription(!editDescription)}
                  id="edit_job_update_button"
                >
                  Update!
                </button>
              </form>
            )}
          </div>

          {/* ********** Submit Button ********** */}
          <div class="edit_job_submit">
            <button id="edit_job_submit_button">Submit Changes!</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditJob;
