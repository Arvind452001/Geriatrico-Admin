"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminSignup } from "../api/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await adminSignup(name, email, password);
alert("Signup successful! Please login.");
      // ✅ success → redirect to login
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Signup failed");
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
      <div className="card shadow-sm" style={{ width: "380px" }}>
        <div className="card-body">

          {/* LOGO */}
          <div className="text-center mb-3">
            <img
              src="/assets/images/logo-3.png"
              alt="logo"
              style={{ width: "200px" }}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>

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

            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn" style={{backgroundColor:"#cd03ff", color: "white", fontWeight: "500" }}
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </div>

          </form>

          {/* LINK TO LOGIN */}
          <div className="text-center mt-3">
            <small>
              Already have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "blue", }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </small>
          </div>

        </div>
      </div>
    </div>
  );
}