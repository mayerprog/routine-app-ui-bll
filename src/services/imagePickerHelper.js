import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

import { addImages } from "../redux/slices/taskSlice";

export const selectImage = async (useLibrary, dispatch) => {
  let result;
  const MAX_SIZE = 4 * 1024 * 1024;

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

      pickedImages.forEach(async (image) => {
        const imageURI = image.uri;
        const fileInfo = await FileSystem.getInfoAsync(imageURI);
        if (fileInfo.size > MAX_SIZE) {
          const resizedImage = await ImageManipulator.manipulateAsync(
            imageURI,
            [{ resize: { width: 1024 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
          dispatch(addImages(resizedImage.uri));
        } else {
          dispatch(addImages(imageURI));
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
