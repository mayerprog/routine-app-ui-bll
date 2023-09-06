import { Provider } from "react-redux";
import AppNav from "./src/navigation/AppNav";
import { store } from "./src/redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
}
