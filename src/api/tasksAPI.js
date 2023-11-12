import axios from "axios";
const { baseURL } = require("../../config");

const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
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
      const response = await instance.post(`/uploadImage`, formData);
      console.log("Image uploaded", response.data.image.data);
      return response.data.image.name;
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
