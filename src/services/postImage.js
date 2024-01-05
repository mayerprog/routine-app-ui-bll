export const postImage = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    const fileName = image.split("/").pop();
    const fileType = fileName.split(".").pop();
    formData.append("image", {
      name: fileName,
      uri: image,
      type: `image/${fileType}`,
    });
  });

  return formData;
};
