import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Header({ title, toggleSidebar }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header style={{ padding: 0 }}>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",   // 🔥 KEY FIX
          alignItems: "center",
          padding: "10px 15px",
          borderBottom: "1px solid #eee"
        }}
      >
        
        {/* LEFT SIDE */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={toggleSidebar}
            className="btn btn-outline-secondary me-2"
          >
            ☰
          </button>

          <h4 style={{ margin: 0 }}>{title}</h4>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="dropdown">
            <button
              className="btn btn-link d-flex align-items-center text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ border: "none", background: "none" }}
            >
              <span className="me-2 d-none d-md-inline text-muted small">
                Admin
              </span>
              <img
                src="/assets/images/avatar.svg"
                alt="avatar"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}
              />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              style={{ padding: "4px 0", minWidth: "140px" }}
            >
              <li>
                <button
                  onClick={handleLogout}
                  className="dropdown-item text-danger"
                  style={{
                    border: "none",
                    background: "none",
                    width: "100%",
                    textAlign: "left",
                    padding: "6px 10px",
                    fontSize: "14px"
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </header>
  )
}