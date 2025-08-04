import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useLogin } from "../../hooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, error, clearError } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill in all the required fields*");
      return;
    }

    setLocalError("");
    clearError();
    const success = await login(email, password);
    if (success) {
      setEmail("");
      setPassword("");
      navigate("/HomePage");
    } else {
      setLocalError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (error === "User not found! Please Register") {
      setEmail("");
      setPassword("");
    }
    if (error === "Incorrect password!") {
      setPassword("");
    }
  }, [error]);

  return (
    <>
      <div className="formContainer">
        <h1>Login to your account</h1>
        <div>
          <p>Registered Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
        </div>
        <div>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </div>
        <button onClick={handleClick} className="loginpageBtn">
          Log in
        </button>
        {loading ? (
          <div className="loadingContainer">
            <div className="spinner"></div>
          </div>
        ) : (
          <form>...</form>
        )}

        {localError ? (
          <p style={{ color: "red" }}>{localError}</p>
        ) : (
          error && <p style={{ color: "red" }}>{error}</p>
        )}
        <p className="donthaveaccnt">
          Don't have an account?{" "}
          <span onClick={() => navigate("/registerPage")}>
            Create an account
          </span>
        </p>
        <p className="terms">
          This site is protected by reCAPTCHA and the{" "}
          <span>Google Privacy Policy</span> and <span>Terms of Service</span>{" "}
          apply.
        </p>
      </div>
    </>
  );
};

export default LoginPage;
