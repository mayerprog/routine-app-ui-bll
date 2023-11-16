import axios from "axios";
const { baseURL } = require("../../config");

const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const configHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const tasksAPI = {
  async createTask(title, description, selectedDate, links, formData) {
    try {
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", selectedDate);
      formData.append("links", JSON.stringify(links));

      console.log("formdata to api", formData);

      const response = await instance.post(
        `/createTask`,
        formData,
        configHeaders
      );
      return response.data;
    } catch (err) {
      console.error(
        "Error creating task:",
        err.response ? err.response.data : err
      );
      alert("Failed to create task. Check console for details.");
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
  async deleteOne(id, images) {
    try {
      const response = await instance.delete(`/deleteOne/${id}`, images);
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
