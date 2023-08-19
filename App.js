import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigation/AppStack";
import AuthStack from "./src/navigation/AuthStack";

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  );
}
