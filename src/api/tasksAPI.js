import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.0.157:3000/tasks",
  withCredentials: true,
});

export const tasksAPI = {
  async createTask(title, description, links) {
    try {
      const response = await instance.post(`/createTask`, {
        title: title,
        description: description,
        links: links,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async getAll() {
    try {
      const response = await instance.get(`/getAll`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
