import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import ViewJob from "../components/viewJob";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(cleanup);

jest.mock("axios");

test("View Jobs List is loaded", () => {
  const jobs = [
    {
      title: "test",
      experience: "experience",
      location: "location",
      description: "description",
    },
  ];
  axios.post.mockResolvedValue({ data: jobs });
  render(<BrowserRouter>{ViewJob(jobs)}</BrowserRouter>);
  const myjobs = screen.getByTestId("viewJobs-1");
  expect(myjobs).toBeInTheDocument();
});
