import instance from ".";
import { saveToken } from "./storage";

const login = async (userInfo) => {
  const res = await instance.post("/auth/login", userInfo);

  const token = res.data.token;
  if (token) {
    saveToken(token);
  }
  console.log(res);
  return res.data;
};

const register = async (userInfo) => {
  // is this sedning a file????
  const formData = new FormData();

  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }

  const res = await instance.post("/auth/register", formData);

  const token = res.data.token;
  if (token) {
    saveToken(token);
  }
  console.log(res);
  return res.data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers };
