import { useEffect, useState } from "react";

export default function TrainingData() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Dummy Data
  const fetchData = () => {
    const dummy = [
      {
        _id: "1",
        child: "Baby Aarav",
        prediction: "Hungry",
        actual: "Hungry",
        confidence: 92,
        source: "PARENT",
        status: "CORRECT",
        date: "2026-04-20",
      },
      {
        _id: "2",
        child: "Baby Riya",
        prediction: "Sleepy",
        actual: "Hungry",
        confidence: 85,
        source: "PARENT",
        status: "WRONG",
        date: "2026-04-19",
      },
      {
        _id: "3",
        child: "Baby Kabir",
        prediction: "Crying",
        actual: "",
        confidence: 70,
        source: "AI",
        status: "PENDING",
        date: "2026-04-18",
      },
    ];

    setData(dummy);
  };

  // 🔥 Filter
  const filteredData =
    filter === "all"
      ? data
      : data.filter((d) => d.status === filter);

  // 🔥 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(start, start + itemsPerPage);

  return (
    <div className="p-3">

      {/* 🔹 Header */}
      <div className="card mb-3 p-3 d-flex flex-row justify-content-between">
        <strong>Training Data</strong>

        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="CORRECT">Correct</option>
          <option value="WRONG">Wrong</option>
          <option value="PENDING">Pending</option>
        </select>
      </div>

      {/* 🔹 Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Child</th>
                <th>AI Prediction</th>
                <th>Actual Label</th>
                <th>Confidence</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.child}</td>

                    <td>{item.prediction}</td>

                    <td>
                      {item.actual ? (
                        item.actual
                      ) : (
                        <span className="text-muted">Not labeled</span>
                      )}
                    </td>

                    <td
                      className={
                        item.confidence < 60 ? "text-danger fw-bold" : ""
                      }
                    >
                      {item.confidence}%
                    </td>

                    <td>
                      <span className="badge bg-info">
                        {item.source}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "CORRECT"
                            ? "bg-success"
                            : item.status === "WRONG"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* 🔥 Pagination */}
        <div className="d-flex justify-content-between p-3">

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <div>
            Page {currentPage} / {totalPages}
          </div>

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}