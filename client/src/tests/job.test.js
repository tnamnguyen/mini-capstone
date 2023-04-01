import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import JobList from "../components/jobs";

afterEach(cleanup);

jest.mock("axios");

test("Jobs List is loaded", () => {
  const jobs = [
    {
      title: "test",
      experience: "experience",
      location: "location",
      description: "description",
    },
    {
      title: "test2",
      experience: "exp",
      location: "loc",
      description: "desc",
    },
  ];
  axios.post.mockResolvedValue({ data: jobs });
  render(
    <BrowserRouter>
      <JobList />
    </BrowserRouter>
  );
  const myjobs = screen.getByTestId("jobs-1");
  expect(myjobs).toBeInTheDocument();
});
