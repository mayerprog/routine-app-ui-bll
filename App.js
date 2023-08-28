import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
// changes
export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
