import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  // baseURL: "https://expart-plan.vercel.app/api/v1/",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default instance;
