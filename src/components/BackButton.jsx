"use client";

import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="btn btn-light border"
      style={{ borderRadius: "8px" }}
    >
      ← Back
    </button>
  );
}