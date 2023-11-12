import axios from "axios";
const { baseURL } = require("../../config");

const path = "/users";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
});

export const authAPI = {
  async login(username, password) {
    try {
      const response = await instance.post(`/login`, {
        username: username,
        password: password,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async logout() {
    try {
      const response = await instance.post(`/logout`);
      return response.data;
    } catch (err) {
      console.log("can't log out" + err);
    }
  },
  async isauth() {
    try {
      const response = await instance.get(`/isauth`);
      return response.data;
    } catch (err) {
      console.log("not authorized" + err);
    }
  },
  async register(username, password, fullname, birthdate) {
    try {
      const response = await instance.post(`/register`, {
        username,
        password,
        fullname,
        birthdate,
      });
      return response.data;
    } catch (err) {
      console.log("register error", err);
    }
  },
};
