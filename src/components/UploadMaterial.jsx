"use client";

import { useState } from "react";

export default function UploadMaterial({ onSuccess, loading, setLoading }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/material/upload", formData);

      const materialId = res.data?.material_id;

      if (!materialId) return alert("Material ID missing");

      onSuccess(materialId); // 🔥 move to next step
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <h3 style={title}>Upload Material</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={input}
      />

      <button onClick={handleUpload} style={btn}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "30px",
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  maxWidth: "420px",
  margin: "auto",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const title = {
  marginBottom: "15px",
  color: "#3D06BA",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const btn = {
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
};

const btnSecondary = {
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  flex: 1,
};