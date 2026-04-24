// "use client";

// import { useState } from "react";
// import UploadMaterial from "../components/UploadMaterial";
// import GenerateQuiz from "../components/GenerateQuiz";

// export default function CreateQuizPage() {
//   const [step, setStep] = useState(1);
//   const [materialId, setMaterialId] = useState("");
//   const [loading, setLoading] = useState(false);

//   return (
//     <div style={page}>

//       <h2 style={{ color: "#3D06BA", marginBottom: "20px" }}>
//         Create Quiz
//       </h2>

//       {step === 1 && (
//         <UploadMaterial
//           setLoading={setLoading}
//           loading={loading}
//           onSuccess={(id) => {
//             setMaterialId(id);
//             setStep(2);
//           }}
//         />
//       )}

//       {step === 2 && (
//         <GenerateQuiz
//           materialId={materialId}
//           loading={loading}
//           setLoading={setLoading}
//           onBack={() => {
//             setStep(1);
//             setMaterialId("");
//           }}
//         />
//       )}

//     </div>
//   );
// }

// const page = {
//   minHeight: "100vh",
//   background: "#f5f5f5",
//   padding: "30px",
// };

// const card = {
//   background: "#fff",
//   padding: "25px",
//   borderRadius: "14px",
//   maxWidth: "420px",
//   margin: "auto",
//   boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
// };

// const title = {
//   marginBottom: "15px",
//   color: "#3D06BA",
// };

// const input = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "12px",
//   borderRadius: "8px",
//   border: "1px solid #ddd",
// };

// const btn = {
//   background: "#3D06BA",
//   color: "#fff",
//   border: "none",
//   padding: "10px",
//   borderRadius: "8px",
//   cursor: "pointer",
//   width: "100%",
// };

// const btnSecondary = {
//   background: "#000",
//   color: "#fff",
//   border: "none",
//   padding: "10px",
//   borderRadius: "8px",
//   cursor: "pointer",
//   flex: 1,
// };

"use client";

import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import BackButton from "../components/BackButton";

export default function CreateQuizPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const [file, setFile] = useState(null);
  const [materialId, setMaterialId] = useState("");

  const [form, setForm] = useState({
    quiz_name: "",
    topic: "",
    num_questions: "",
    level: "easy",
  });

  const [loading, setLoading] = useState(false);

  // ================= FILE UPLOAD ================= //
  const handleUpload = async () => {
    if (!file) return alert("Please select file");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/material/upload", formData);

      console.log("UPLOAD RESPONSE:", res.data);

      // ✅ IMPORTANT: adjust based on your API response
      const matId = res.data?.material_id;

      if (!matId) {
        alert("Material ID not found");
        return;
      }

      setMaterialId(matId);

      // 🔥 switch modal
      setShowUploadModal(false);
      setShowQuizModal(true);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= CREATE QUIZ ================= //
  const handleCreateQuiz = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("material_id", materialId);
      params.append("quiz_name", form.quiz_name);
      params.append("topic", form.topic);
      params.append("num_questions", form.num_questions);
      params.append("level", form.level);

      const res = await axiosInstance.post("/material/generate-quiz", params);

      console.log("QUIZ CREATED:", res.data);

      alert("Quiz created successfully");

      // reset
      setShowQuizModal(false);
      setShowUploadModal(true);
      setMaterialId("");
    } catch (err) {
      console.error(err);
      alert("Quiz creation failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI ================= //
  return (
    <div style={page}>
      {/* Add spinner keyframe animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="d-flex align-items-center gap-2 mb-3">
        <BackButton />
        <h2 style={{ color: "#3D06BA" }}>Create Quiz</h2>
      </div>

      <button style={btnPrimary} onClick={() => setShowUploadModal(true)}>
        + Create New Quiz
      </button>

      {/* ================= LOADING SPINNER OVERLAY ================= */}
      {loading && (
        <div style={loaderOverlay}>
          <div style={spinner}></div>
        </div>
      )}

      {/* ================= UPLOAD MODAL ================= */}
      {showUploadModal && (
        <div style={overlay}>
          <div style={modal}>
            <h4>Upload Material</h4>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ marginBottom: "10px" }}
            />

            <button onClick={handleUpload} style={btnPrimary}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}

      {/* ================= QUIZ MODAL ================= */}
      {showQuizModal && (
        <div style={overlay}>
          <div style={modal}>
            <h4>Generate Quiz</h4>

            <p style={{ fontSize: "12px" }}>Material ID: {materialId}</p>

            <input
              placeholder="Quiz Name"
              value={form.quiz_name}
              onChange={(e) => setForm({ ...form, quiz_name: e.target.value })}
              style={input}
            />

            <input
              placeholder="Topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              style={input}
            />

            <input
              type="number"
              placeholder="Number of Questions"
              value={form.num_questions}
              onChange={(e) =>
                setForm({ ...form, num_questions: e.target.value })
              }
              style={input}
            />

            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              style={input}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button onClick={handleCreateQuiz} style={btnPrimary}>
              {loading ? "Creating..." : "Create Quiz"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ================= STYLES ================= //

const page = {
  padding: "20px",
  minHeight: "100vh",
  background: "#f5f5f5",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
};

const btnPrimary = {
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

// Loader overlay styles
const loaderOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  backdropFilter: "blur(2px)",
};

const spinner = {
  width: "50px",
  height: "50px",
  border: "4px solid rgba(255, 255, 255, 0.3)",
  borderTop: "4px solid #ffffff",
  borderRadius: "50%",
  animation: "spin 0.8s linear infinite",
};
