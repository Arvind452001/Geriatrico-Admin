"use client";

export default function GenerateQuiz({
  materialId,
  loading,
  setLoading,
  onBack,
}) {
  const [form, setForm] = useState({
    quiz_name: "",
    topic: "",
    num_questions: "",
    level: "easy",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append("material_id", materialId);
      params.append("quiz_name", form.quiz_name);
      params.append("topic", form.topic);
      params.append("num_questions", form.num_questions);
      params.append("level", form.level);

      const res = await axiosInstance.post(
        "/material/generate-quiz",
        params
      );

      alert("Quiz created successfully");
      onBack(); // 🔁 reset flow

    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={card}>
      <h3 style={title}>Generate Quiz</h3>

      <p style={{ fontSize: 12, color: "#666" }}>
        Material ID: {materialId}
      </p>

      <input
        placeholder="Quiz Name"
        style={input}
        onChange={(e) =>
          setForm({ ...form, quiz_name: e.target.value })
        }
      />

      <input
        placeholder="Topic"
        style={input}
        onChange={(e) =>
          setForm({ ...form, topic: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Number of Questions"
        style={input}
        onChange={(e) =>
          setForm({ ...form, num_questions: e.target.value })
        }
      />

      <select
        style={input}
        onChange={(e) =>
          setForm({ ...form, level: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={onBack} style={btnSecondary}>
          Back
        </button>

        <button onClick={handleSubmit} style={btn}>
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </div>
    </div>
  );
}