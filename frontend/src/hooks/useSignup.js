import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext(); //for authentication, so that we can login
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //localStorage
      localStorage.setItem("chat-user", JSON.stringify(data)); //chat-user is coming from AuthContext.jsx
      setAuthUser(data);

      // Clear selected conversation after signup
      localStorage.removeItem("selectedConversation");
      useConversation.getState().setSelectedConversation(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return [loading, signup];
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords didnot match");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must contain at least 8 characters");
    return false;
  }
  return true;
}
