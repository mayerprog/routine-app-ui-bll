import axios from "axios";
import { setUserData } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const instance = axios.create({
  baseURL: "http://10.0.2.2:3000/users",
  withCredentials: true,
});

export const authAPI = {
  async login(username, password) {
    try {
      const response = await instance.post(`/login`, {
        username,
        password,
      });
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.log("login error", err);
    }
  },
  async logout() {
    const response = await instance.delete(`/logout`);
    return response.data;
  },
  async isauth() {
    try {
      const response = await instance.get(`/isauth`);
      console.log("response", response);
      return response.data;
    } catch (err) {
      console.log("some error", err);
    }
  },
  async me() {
    try {
      const response = await instance.get(`/me`);
      // let { id, username, fullname } = response.data;
      return response.data;
    } catch (err) {
      console.log("no data", err);
    }
  },
};
