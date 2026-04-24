"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#dfa4ee",
      }}

    >
      <div className="login-card card shadow-sm" style={{ width: "380px" }}>
        <div className="card-body">
          <div className="text-center mb-3">
            <img
              src="/assets/images/logo-3.png"
              alt="logo"
              style={{ width: "200px" }}
            />
          </div>
          {/* <h5 className="card-title text-center">Admin Login</h5> */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label className="form-label">Email</label>
    <input
      type="email"
      className="form-control"
      placeholder="admin@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={loading}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Password</label>
    <input
      type="password"
      className="form-control"
      placeholder="••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled={loading}
    />
  </div>

  <div className="d-grid mt-5">
    <button
      type="submit"
      className="btn " style={{backgroundColor:"#cd03ff",color: "white", fontWeight: "500"}}
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
  </div>
</form>

{/* 🔥 ADD THIS BLOCK */}
<div className="text-center mt-3">
  <small>
    Are you a new user?{" "}
    <span
     style={{ cursor: "pointer", color: "blue" }}
      onClick={() => navigate("/signup")}
    >
      Sign up
    </span>
  </small>
</div>
        </div>
      </div>
    </div>
  );
}
