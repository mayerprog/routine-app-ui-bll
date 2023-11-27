import { Provider } from "react-redux";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
import "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import Constants from "expo-constants";

export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
