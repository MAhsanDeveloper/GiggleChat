
import React, { useEffect, Suspense}  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/login/login";
import Signup from "./pages/signup/signup"; 
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../src/context/AuthContext";
import { useThemeStore } from "./zustand/useTheme";


const Home = React.lazy(() => import("./pages/home/Home"));
const ThemesPage = React.lazy(() => import("./pages/theme/ThemesPage"));

function App() {
  const { authUser } = useAuthContext();
  const { theme } = useThemeStore();

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

  return (
      <div className={`min-h-screen ${theme === 'dark' || theme === 'light' ? 'theme-bg' : ''}`}>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/themes" element={authUser ? <ThemesPage /> : <Navigate to="/login" />} />
      </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;