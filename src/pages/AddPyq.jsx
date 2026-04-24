"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadPyq } from "../api/pyqApi";
import BackButton from "../components/BackButton";

export default function AddPyq() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: "",
    subject: "",
  });

  const [files, setFiles] = useState({
    questions_pdf: null,
    answers_pdf: null,
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT ================= //
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  // ================= SUBMIT ================= //
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files.questions_pdf || !files.answers_pdf) {
      return alert("Please upload both files");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("questions_pdf", files.questions_pdf);
      formData.append("answers_pdf", files.answers_pdf);
      formData.append("year", form.year);
      formData.append("subject", form.subject);

      await uploadPyq(formData);

      alert("PYQ uploaded successfully");
      navigate("/pyq");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <BackButton />
          <h3 className="fw-bold" style={{ color: "#3D06BA" }}>
            Upload PYQ
          </h3>
        </div>
        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/pyq")}
        >
          Back
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* FILES */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Questions PDF *
                </label>
                <input
                  type="file"
                  name="questions_pdf"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Answers PDF *</label>
                <input
                  type="file"
                  name="answers_pdf"
                  className="form-control"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            {/* TEXT INPUTS */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Year *</label>
                <input
                  type="text"
                  name="year"
                  className="form-control"
                  placeholder="e.g. 2025"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="e.g. Phase A Exam"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light border"
                onClick={() => navigate("/pyq")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn text-white"
                style={{
                  background: "linear-gradient(135deg,#3D06BA,#7b2ff7)",
                }}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload PYQ"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
