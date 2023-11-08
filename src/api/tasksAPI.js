import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.10.125:3000/tasks",
  withCredentials: true,
});

export const tasksAPI = {
  async createTask(title, description, selectedDate, links, image) {
    try {
      const response = await instance.post(`/createTask`, {
        title: title,
        description: description,
        links: links,
        date: selectedDate,
        image: image,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
  async uploadImage(formData) {
    try {
      const response = await instance.post(`/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
  async updateTask(id, updatedTask) {
    try {
      const response = await instance.put(`/updateTask/${id}`, updatedTask);
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
