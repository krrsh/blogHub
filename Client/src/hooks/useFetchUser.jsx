import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("https://bloghub-atng.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch user")
      );
  }, []);

  return { user, error };
};
