import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { deleteQuiz } from "../api/user.api";
import BackButton from "../components/BackButton";

export default function QuizPage() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // list | create | edit | view
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    quiz_name: "",
    topic: "",
    level: "easy",
    total_questions: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // ================= DUMMY FETCH ================= //
  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.get("/material/quizzes");

      console.log("Quiz Data:", response.data);

      setData(response.data.quizzes); // state me set karo
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // ================= HANDLERS ================= //
  const handleDelete = (id) => {
    const res = deleteQuiz(id);
    if (!window.confirm("Delete this quiz?")) return;
    setData((prev) => prev.filter((q) => q.quiz_id !== id));
  };

  const handleEdit = (quiz) => {
    setSelected(quiz);
    setForm(quiz);
    setViewMode("edit");
  };

  const handleView = (quiz) => {
    setSelected(quiz);
    setViewMode("view");
  };

  const handleCreate = () => {
    setForm({
      quiz_name: "",
      topic: "",
      level: "easy",
      total_questions: "",
    });
    setViewMode("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (viewMode === "create") {
      const newQuiz = {
        ...form,
        quiz_id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setData([newQuiz, ...data]);
    } else {
      setData((prev) =>
        prev.map((q) =>
          q.quiz_id === selected.quiz_id ? { ...q, ...form } : q,
        ),
      );
    }

    setViewMode("list");
  };

  // ================= PAGINATION ================= //
  const totalPages = Math.ceil(data.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentData = data.slice(start, start + perPage);

  // ================= UI ================= //
  return (
    <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <BackButton />
          <h3 style={{ color: "#3D06BA" }}>Quiz Management</h3>
        </div>

        {/* {viewMode === "list" && (
          <button
            onClick={handleCreate}
            style={btnPrimary}
          >
            + Add Quiz
          </button>
        )} */}
      </div>

      {/* ================= LIST VIEW ================= */}
      {viewMode === "list" && (
        <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        >
          <table style={{ width: "100%" }}>
            <thead style={{ background: "#3D06BA", color: "#fff" }}>
              <tr>
                <th style={th}>#</th>
                <th style={th}>Name</th>
                <th style={th}>Topic</th>
                <th style={th}>Level</th>
                <th style={th}>Questions</th>
                {/* <th style={th}>Plays</th> */}
                {/* <th style={th}>Avg Score</th> */}
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((q, i) => (
                <tr key={q.quiz_id}>
                  <td style={td}>{start + i + 1}</td>
                  <td style={td}>{q.quiz_name}</td>
                  <td style={td}>{q.topic}</td>
                  <td style={td}>{q.level}</td>
                  <td style={td}>{q.total_questions}</td>
                  {/* <td style={td}>{q.quiz_play_count}</td> */}
                  {/* <td style={td}>{q.average_score}</td> */}

                  <td style={td}>
                    {/* <button onClick={() => handleView(q)} style={iconBtn}>👁️</button> */}
                    {/* <button onClick={() => handleEdit(q)} style={iconBtn}>✏️</button> */}
                    <button
                      onClick={() => handleDelete(q.quiz_id)}
                      style={iconBtnDark}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>

            <span>
              Page {currentPage} / {totalPages}
            </span>

            <div>
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CREATE / EDIT ================= */}
      {(viewMode === "create" || viewMode === "edit") && (
        <div style={formCard}>
          <h4>{viewMode === "create" ? "Create Quiz" : "Update Quiz"}</h4>

          <form onSubmit={handleSubmit}>
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

            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
              style={input}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <input
              type="number"
              placeholder="Total Questions"
              value={form.total_questions}
              onChange={(e) =>
                setForm({ ...form, total_questions: e.target.value })
              }
              style={input}
            />

            <button style={btnPrimary}>Save</button>
          </form>
        </div>
      )}

      {/* ================= VIEW ================= */}
      {viewMode === "view" && selected && (
        <div style={formCard}>
          <h4>Quiz Details</h4>

          <p>
            <b>Name:</b> {selected.quiz_name}
          </p>
          <p>
            <b>Topic:</b> {selected.topic}
          </p>
          <p>
            <b>Level:</b> {selected.level}
          </p>
          <p>
            <b>Total Questions:</b> {selected.total_questions}
          </p>
          {/* <p><b>Play Count:</b> {selected.quiz_play_count}</p>
          <p><b>Latest Score:</b> {selected.latest_score}</p>
          <p><b>Average Score:</b> {selected.average_score}</p> */}

          <button onClick={() => setViewMode("list")} style={btnPrimary}>
            Back
          </button>
        </div>
      )}
    </div>
  );
}

// ================= STYLES =================
const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px", borderBottom: "1px solid #ddd" };

const btnPrimary = {
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer",
};

const iconBtn = {
  marginRight: "5px",
  borderRadius: "50%",
  padding: "6px",
  background: "#3D06BA",
  color: "#fff",
  border: "none",
};

const iconBtnDark = {
  borderRadius: "50%",
  padding: "6px",
  background: "#000",
  color: "#fff",
  border: "none",
};

const formCard = {
  marginTop: "20px",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  maxWidth: "500px",
};

const input = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "8px",
};
