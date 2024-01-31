import axios from "axios";
const { baseURL } = require("../../config");

const path = "/tasks";

const instance = axios.create({
  baseURL: baseURL + path,
  withCredentials: true,
  // headers: {
  //   Accept: "application/json",
  // },
});

const configHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const tasksAPI = {
  async createTask(
    title,
    description,
    selectedDate,
    timeZone,
    links,
    formData
  ) {
    try {
      formData.append("title", title);
      formData.append("description", description);
      formData.append(
        "date",
        JSON.stringify({
          date: selectedDate,
          timeZone: timeZone,
        })
      );
      formData.append("links", JSON.stringify(links));

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
  async getAll() {
    try {
      const response = await instance.get(`/getAll`);
      return response.data;
    } catch (err) {
      console.error(
        "Error getting tasks:",
        err.response ? err.response.data : err
      );
      alert("Failed to get all tasks. Check console for details.");
    }
  },
  async deleteOne(id) {
    try {
      const response = await instance.delete(`/deleteOne/${id}`);
      return response.data;
    } catch (err) {
      console.error(
        "Error deleting a task:",
        err.response ? err.response.data : err
      );
      alert("Failed to delete a task. Check console for details.");
    }
  },
  async updateTask(id, updatedTask, imagesForDelete, formData) {
    // console.log("deletedImagesAPI", deletedImages);
    try {
      formData.append("updatedTask", JSON.stringify(updatedTask));
      formData.append("imagesForDelete", JSON.stringify(imagesForDelete));

      const response = await instance.put(
        `/updateTask/${id}`,
        formData,
        configHeaders
      );
      return response.data;
    } catch (err) {
      console.error(
        "Error updating a task:",
        err.response ? err.response.data : err
      );
      alert("Failed to update a task. Check console for details.");
    }
  },
};
