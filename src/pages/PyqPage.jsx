"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePyq, getPyqList } from "../api/pyqApi";
import BackButton from "../components/BackButton";

export default function PyqPage() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();

  // ================= FETCH ================= //
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getPyqList();
      setData(res.papers || []);
      setStats(res.stats || {});
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PAGINATION ================= //
  const totalPages = Math.ceil(data.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentData = data.slice(start, start + perPage);

  // ================= ACTIONS ================= //
 const handleDelete = async (id) => {
  if (!window.confirm("Delete this paper?")) return;

  try {
    // 🔥 API call
    await deletePyq(id);

    // ✅ Update UI after success
    setData((prev) => prev.filter((p) => p.pyq_id !== id));

    alert("Deleted successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to delete");
  }
};

  const handleView = (item) => {
    setSelected(item);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

  return (
    <div style={page}>

      {/* ================= HEADER ================= */}
      <div style={header}>
        <div className="d-flex align-items-center gap-2 mb-3">
  <BackButton />
 <h2 style={{ color: "#3D06BA" }}>PYQ Papers</h2>
</div>
        


        <button
          onClick={() => navigate("/add-pyq")}
          style={addBtn}
        >
          + Add PYQ
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div style={statsRow}>
        {/* <StatBox title="Total" value={stats.total_papers} /> */}
        {/* <StatBox title="Played" value={stats.played_papers} /> */}
        {/* <StatBox title="Remaining" value={stats.remaining_papers} /> */}
        {/* <StatBox title="Avg Score" value={stats.average_score} /> */}
      </div>
{/*  */}
      {/* ================= TABLE ================= */}
      <div style={card}>
        <table style={table}>

          <thead style={thead}>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Subject</th>
              <th>Questions</th>
              {/* <th>Status</th> */}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item, i) => (
              <tr key={item.pyq_id} style={tr}>
                <td>{start + i + 1}</td>
                <td>{item.year}</td>
                <td>{item.subject}</td>
                <td>{item.total_questions}</td>

                {/* <td>
                  <span style={item.is_played ? statusActive : statusInactive}>
                    {item.is_played ? "Played" : "New"}
                  </span>
                </td> */}

                <td>
                  <button onClick={() => handleView(item)} style={viewBtn}>👁️</button>
                  <button onClick={() => handleDelete(item.pyq_id)} style={deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

        {/* ================= PAGINATION ================= */}
        <div style={pagination}>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>

          <span>Page {currentPage} / {totalPages}</span>

          <div>
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selected && (
        <div style={overlay}>
          <div style={modal}>

            <h3 style={{ marginBottom: "15px" }}>Paper Details</h3>

            <div style={{ display: "flex", gap: "20px" }}>

              <div style={{ flex: 1 }}>
                <p><b>Year:</b> {selected.year}</p>
                <p><b>Subject:</b> {selected.subject}</p>
                <p><b>Total Questions:</b> {selected.total_questions}</p>
                <p><b>Play Count:</b> {selected.quiz_play_count}</p>
              </div>

              <div style={{ flex: 1 }}>
                <p><b>Latest Score:</b> {selected.latest_score ?? "-"}</p>
                <p><b>Average Score:</b> {selected.average_score}</p>
                <p><b>History:</b> {selected.score_history?.join(", ") || "-"}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span style={selected.is_played ? statusActive : statusInactive}>
                    {selected.is_played ? "Played" : "New"}
                  </span>
                </p>
              </div>

            </div>

            <div style={{ textAlign: "right", marginTop: "15px" }}>
              <button onClick={() => setSelected(null)} style={closeBtn}>
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// ================= COMPONENT ================= //

const StatBox = ({ title, value }) => (
  <div style={statBox}>
    <h6>{title}</h6>
    <h3>{value || 0}</h3>
  </div>
);

// ================= STYLES ================= //

const page = {
  padding: "20px",
  background: "#f5f5f5",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const statsRow = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "10px",
  marginBottom: "20px",
};

const statBox = {
  background: "linear-gradient(135deg,#3D06BA,#7b2ff7)",
  color: "#fff",
  padding: "15px",
  borderRadius: "12px",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "10px",
};

const table = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const thead = {
  background: "#3D06BA",
  color: "#fff",
};

const tr = {
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  borderRadius: "10px",
};

const pagination = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
};

const addBtn = {
  background: "linear-gradient(135deg,#3D06BA,#7b2ff7)",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
};

const viewBtn = {
  marginRight: "5px",
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  padding: "6px",
};

const deleteBtn = {
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  padding: "6px",
};

const statusActive = {
  background: "#28a745",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "20px",
};

const statusInactive = {
  background: "#6c757d",
  color: "#fff",
  padding: "4px 10px",
  borderRadius: "20px",
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
};

const modal = {
  background: "#fff",
  padding: "25px",
  borderRadius: "14px",
  width: "500px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
};

const closeBtn = {
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "8px",
};