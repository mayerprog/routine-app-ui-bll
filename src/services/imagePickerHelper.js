import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { addImages } from "../redux/slices/taskSlice";

export const selectImage = async (useLibrary, dispatch) => {
  let result;
  const MAX_SIZE = 7 * 1024 * 1024;

  const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    allowsMultipleSelection: true,
    aspect: [4, 3],
    quality: 1,
  };

  try {
    if (useLibrary) {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      const pickedImages = result.assets;
      console.log(pickedImages);

      pickedImages.forEach(async (image) => {
        const imageURI = image.uri;
        const fileInfo = await FileSystem.getInfoAsync(imageURI);
        if (fileInfo.size > MAX_SIZE) {
          alert("File is too large. Please upload an image smaller than 7 MB.");
          return;
        }
        dispatch(addImages(imageURI));
      });
    }
  } catch (error) {
    console.log(error);
  }
};
