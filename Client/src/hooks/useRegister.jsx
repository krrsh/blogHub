import { useState } from "react";
import { useAuthContext } from "../context/authContext";
import axios from "axios";

export const useRegister = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);

  const register = async (username, email, password) => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", {
        username,
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", payload: data.token });
      setError(null);
      return true;
    } catch (err) { 
      setError(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  return { register, error };
};
