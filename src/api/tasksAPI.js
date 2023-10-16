import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.3.13:3000/tasks",
  withCredentials: true,
});

export const tasksAPI = {
  async createTask(title, description, selectedDate, links) {
    try {
      const response = await instance.post(`/createTask`, {
        title: title,
        description: description,
        links: links,
        date: selectedDate,
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
  async deleteOne(id) {
    try {
      const response = await instance.delete(`/deleteOne/${id}`);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
