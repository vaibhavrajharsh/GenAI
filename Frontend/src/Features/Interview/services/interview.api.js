import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateReport = ({jobDescription, selfDescription, resume})=>{
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resume);

  return api.post("/api/interview", formData);
}

export const getAllReports = () => {
  return api.get("/api/interview");
}

export const getReportById = (interviewId) => {
  return api.get(`/api/interview/report/${interviewId}`);
}
