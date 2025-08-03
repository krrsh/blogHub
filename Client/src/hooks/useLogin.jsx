import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", payload: data.token });
      setError(null); 
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return false;
    }
  };


    const clearError = () => {
    setError(null);
  };

  return { login, error, clearError };
};
