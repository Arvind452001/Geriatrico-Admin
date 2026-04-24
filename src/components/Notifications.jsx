import { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";

export default function Notifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ================= FETCH ================= //
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await getNotifications();
      console.log("API RESPONSE:", res);

      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ================= PAGINATION ================= //
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(start, start + itemsPerPage);

  // ================= FORMAT DATE ================= //
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container py-4">

      {/* 🔹 HEADER */}
      <div className="mb-3">
        <h4>Notifications</h4>
      </div>

      {/* 🔹 TABLE */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Message</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No notifications found
                  </td>
                </tr>
              ) : (
                currentItems.map((n, index) => (
                  <tr key={n.id}>
                    <td>{start + index + 1}</td>

                    <td>{n.title}</td>

                    <td style={{ maxWidth: "250px" }}>
                      {n.message}
                    </td>

                    {/* 🔹 TYPE BADGE */}
                    <td>
                      <span
                        className={`badge ${
                          n.notification_type === "alert"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {n.notification_type}
                      </span>
                    </td>

                    {/* 🔹 READ STATUS */}
                    <td>
                      <span
                        className={`badge ${
                          n.is_read
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {n.is_read ? "Read" : "Unread"}
                      </span>
                    </td>

                    {/* 🔹 DATE */}
                    <td>{formatDate(n.created_at)}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* 🔥 PAGINATION */}
        {data.length > 0 && (
          <div className="d-flex justify-content-between align-items-center p-3">

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
        )}
      </div>
    </div>
  );
}