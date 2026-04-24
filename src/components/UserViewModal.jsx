const UserViewModal = ({ show, onClose, user }) => {
  if (!show || !user) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleString();

  return (
    <>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        zIndex: 999
      }}>
        <div style={{
          background: "#fff",
          width: "500px",
          margin: "100px auto",
          borderRadius: "10px",
          overflow: "hidden"
        }}>

          {/* HEADER */}
          <div style={{
            background: "#3D06BA",
            color: "#fff",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <h5>User Details</h5>
            <button onClick={onClose} style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px"
            }}>×</button>
          </div>

          {/* BODY */}
          <div style={{ padding: "20px" }}>

            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              {user.profile_photo ? (
                <img src={user.profile_photo} alt=""
                  style={{ width: 80, height: 80, borderRadius: "50%" }} />
              ) : (
                <div style={{ fontSize: "60px" }}>👤</div>
              )}
            </div>

            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p>
              <b>Phone:</b>{" "}
              {user.phone_no
                ? `${user.country_code} ${user.phone_no}`
                : "N/A"}
            </p>
            <p>
              <b>Status:</b>{" "}
              {user.is_verified ? "Verified" : "Not Verified"}
            </p>
            <p><b>Created:</b> {formatDate(user.created_at)}</p>

          </div>

        </div>
      </div>
    </>
  );
};

export default UserViewModal;