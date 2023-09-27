import axios from "axios";

const instance = axios.create({
  baseURL: `http://10.0.0.4:3000/users`,
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
