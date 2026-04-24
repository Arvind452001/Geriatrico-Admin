import { useEffect, useState } from "react";

export default function Predictions() {
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

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
        confidence: 92,
        actual: "Hungry",
        status: "CORRECT",
        date: "2026-04-20",
      },
      {
        _id: "2",
        child: "Baby Riya",
        prediction: "Sleepy",
        confidence: 85,
        actual: "",
        status: "PENDING",
        date: "2026-04-19",
      },
      {
        _id: "3",
        child: "Baby Aarav",
        prediction: "Crying",
        confidence: 60,
        actual: "Pain",
        status: "WRONG",
        date: "2026-04-18",
      },
      {
        _id: "4",
        child: "Baby Kabir",
        prediction: "Hungry",
        confidence: 75,
        actual: "",
        status: "PENDING",
        date: "2026-04-17",
      },
    ];

    setData(dummy);
  };

  // 🔥 Filters
  const filteredData = data.filter((item) => {
    return (
      (filterStatus === "all" || item.status === filterStatus) &&
      (filterType === "all" || item.prediction === filterType)
    );
  });

  // 🔥 Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔥 Handle correction
  const handleCorrection = (id, value) => {
    const updated = data.map((item) =>
      item._id === id
        ? {
            ...item,
            actual: value,
            status:
              value === item.prediction ? "CORRECT" : "WRONG",
          }
        : item
    );

    setData(updated);
  };

  // 🔥 Stats
  const total = data.length;
  const correct = data.filter((d) => d.status === "CORRECT").length;
  const wrong = data.filter((d) => d.status === "WRONG").length;
  const pending = data.filter((d) => d.status === "PENDING").length;

  return (
    <div className="p-3">

      {/* 🔹 Stats */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white p-3">
            <p>Total Predictions</p>
            <h4>{total}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white p-3">
            <p>Correct</p>
            <h4>{correct}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white p-3">
            <p>Wrong</p>
            <h4>{wrong}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white p-3">
            <p>Pending</p>
            <h4>{pending}</h4>
          </div>
        </div>
      </div>

      {/* 🔹 Filters */}
      <div className="card mb-3 p-3 d-flex flex-row gap-3">
        <select
          className="form-select w-auto"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="CORRECT">Correct</option>
          <option value="WRONG">Wrong</option>
          <option value="PENDING">Pending</option>
        </select>

        <select
          className="form-select w-auto"
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Types</option>
          <option value="Hungry">Hungry</option>
          <option value="Sleepy">Sleepy</option>
          <option value="Crying">Crying</option>
          <option value="Pain">Pain</option>
        </select>
      </div>

      {/* 🔹 Table */}
      <div className="card">
        <div className="card-header">
          <strong>Predictions</strong>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Child</th>
                <th>Prediction</th>
                <th>Confidence</th>
                <th>Actual</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.child}</td>
                    <td>{item.prediction}</td>

                    <td
                      className={
                        item.confidence < 60 ? "text-danger fw-bold" : ""
                      }
                    >
                      {item.confidence}%
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={item.actual}
                        onChange={(e) =>
                          handleCorrection(item._id, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        <option value="Hungry">Hungry</option>
                        <option value="Sleepy">Sleepy</option>
                        <option value="Crying">Crying</option>
                        <option value="Pain">Pain</option>
                      </select>
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
        <div className="d-flex justify-content-between align-items-center p-3">

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          <div>
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}