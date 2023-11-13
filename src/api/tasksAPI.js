import axios from "axios";
const { baseURL } = require("../../config");

const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export const tasksAPI = {
  async createTask(title, description, selectedDate, links, formData) {
    try {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", selectedDate);
      // links.forEach((link, index) => {
      //   formData.append(`links[${index}]`, link);
      // });
      formData.append("links", JSON.stringify(links));
      const response = await instance.post(`/createTask`, formData);
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
