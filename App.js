import {AuthProvider} from "./src/context/AuthContext";
import AppNavigations from "./src/navigation/AppNavigations";

export default function App() {
  return (
      <AuthProvider>
        <AppNavigations  />
      </AuthProvider>

  );
}


