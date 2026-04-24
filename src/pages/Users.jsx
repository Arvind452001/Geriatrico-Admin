import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/user.api";
import UserViewModal from "../components/UserViewModal";
import BackButton from "../components/BackButton";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    setUsers(res.data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    fetchUsers();
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const totalPages = Math.ceil(users.length / perPage);
  const start = (currentPage - 1) * perPage;
  const currentData = users.slice(start, start + perPage);

  return (
    <div style={{ padding: "20px", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
       <div className="d-flex align-items-center gap-2 mb-3">
  <BackButton />
  <h3 style={{ color: "#3D06BA", margin: 0 }}>Users</h3>
</div>

        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          style={{ padding: "5px" }}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#3D06BA", color: "#fff" }}>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={td}>
                  Loading...
                </td>
              </tr>
            ) : (
              currentData.map((user, index) => (
                <tr key={user.id}>
                  <td style={td}>{start + index + 1}</td>
                  <td style={td}>{user.name}</td>
                  <td style={td}>{user.email}</td>
                  <td style={td}>
                    {user.phone_no
                      ? `${user.country_code} ${user.phone_no}`
                      : "N/A"}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "5px",
                        background: user.is_verified ? "green" : "gray",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    >
                      {user.is_verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td style={td}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* VIEW BUTTON */}
                      <button
                        onClick={() => handleView(user)}
                        style={{
                          background: "#3D06BA",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        title="View"
                      >
                        👁️
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={{
                          background: "#000",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10%",
                          width: "36px",
                          height: "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <UserViewModal
        show={showModal}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
    </div>
  );
}

// 🔥 styles
const th = { padding: "10px", textAlign: "left" };
const td = { padding: "10px", borderBottom: "1px solid #ddd" };

const viewBtn = {
  background: "#3D06BA",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
};
