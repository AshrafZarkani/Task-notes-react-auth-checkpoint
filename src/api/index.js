import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "https://task-react-auth-backend.eapi.joincoded.com/api",
});

export default instance;
