import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationModal from "../components/NotificationModal";
import { createNotification } from "../api/notificationApi";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchRecords();
  }, []);

  // 🔥 Dummy User
  const fetchUser = () => {
    const dummyUser = {
      _id: id,
      name: "Amit Sharma",
      email: "amit@test.com",
      phone: "9876543210",
      totalChildren: 2,
      totalRecordings: 25,
      isActive: true,
    };

    setUser(dummyUser);
  };

  // 🔥 Dummy Audio History
  const fetchRecords = () => {
    const dummy = [
      {
        _id: "1",
        child: "Baby Aarav",
        prediction: "Hungry",
        confidence: "92%",
        date: "2026-04-20",
        status: "CORRECT",
      },
      {
        _id: "2",
        child: "Baby Riya",
        prediction: "Sleepy",
        confidence: "85%",
        date: "2026-04-18",
        status: "PENDING",
      },
      {
        _id: "3",
        child: "Baby Aarav",
        prediction: "Crying",
        confidence: "78%",
        date: "2026-04-15",
        status: "WRONG",
      },
    ];

    setRecords(dummy);
  };

const sendNotification = async (formData) => {
  try {
    await createNotification({
      ...formData,
      parent_id: id, // ✅ attach user id
    });

    alert("Notification sent successfully");
    setShowModal(false);
  } catch (err) {
    console.error(err);
    alert("Failed to send notification");
  }
};
  return (
    <div className="p-3">

      {/* 🔹 User Info Card */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
  <h5>User Details</h5>

  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() => setShowModal(true)}
  >
    🔔 Send Notification
  </button>
</div>

          {user && (
            <div className="row">
              <div className="col-md-4">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>

              <div className="col-md-4">
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Total Children:</strong> {user.totalChildren}</p>
              </div>

              <div className="col-md-4">
                <p><strong>Total Recordings:</strong> {user.totalRecordings}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      user.isActive ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🔹 Audio History Table */}
      <div className="card">
        <div className="card-header">
          <strong>Audio Records History</strong>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Child</th>
                <th>Prediction</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td>{r.child}</td>
                  <td>{r.prediction}</td>
                  <td>{r.confidence}</td>
                  <td>{r.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.status === "CORRECT"
                          ? "bg-success"
                          : r.status === "PENDING"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
<NotificationModal
  show={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={sendNotification}
/>
    </div>
  );
}