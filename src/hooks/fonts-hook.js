import { useFonts } from "expo-font";

export default function Fonts() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "REM-ExtraLight": require("../assets/fonts/REM-ExtraLight.ttf"),
    "REM-BoldItalic": require("../assets/fonts/REM-BoldItalic.ttf"),
    "Preahvihear-Regular": require("../assets/fonts/Preahvihear-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Lexend-Regular": require("../assets/fonts/Lexend-Regular.ttf"),
  });

  return fontsLoaded;
}
