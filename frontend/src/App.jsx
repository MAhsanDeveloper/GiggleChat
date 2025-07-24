
import React, {Suspense}  from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/login/login";
import Signup from "./pages/signup/signup"; 
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../src/context/AuthContext";

const Home = React.lazy(() => import("./pages/home/Home"));

function App() {
  const { authUser } = useAuthContext();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;