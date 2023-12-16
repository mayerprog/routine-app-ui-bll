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
  // async uploadImage(formData) {
  //   try {
  //     const response = await instance.post(`/uploadImage`, formData);
  //     console.log("Image uploaded", response.data.image.data);
  //     return response.data.image.name;
  //   } catch (err) {
  //     alert(err);
  //   }
  // },
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
  async updateTask(id, updatedTask, deletedImages) {
    console.log("deletedImagesAPI", deletedImages);
    try {
      const response = await instance.put(`/updateTask/${id}`, {
        updatedTask: updatedTask,
        imagesName: deletedImages,
      });
      return response.data;
    } catch (err) {
      alert(err);
    }
  },
};
