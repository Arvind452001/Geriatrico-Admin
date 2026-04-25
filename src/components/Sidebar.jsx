import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ collapsed }) {
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      style={{
        width: collapsed ? "70px" : "240px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#3D06BA",
        color: "#fff",
        transition: "width 0.3s ease",
        overflowX: "hidden"
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          background: "#fff",
          justifyContent: "center",
        }}
      >
        <img
          src="/assets/images/logo-3.png"
          alt="logo"
          style={{
            width: collapsed ? "40px" : "150px",
            transition: "0.3s"
          }}
        />
      </div>

      <ul style={{ listStyle: "none", padding: "10px" }}>
        {menuItem("/dashboard", "fa-home", "Dashboard")}
        {menuItem("/users", "fa-users", "Users")}
        {menuItem("/quiz", "fa-question-circle", "Quiz")}
        {menuItem("/create-quiz", "fa-plus", "Create Quiz")}
        {menuItem("/pyq", "fa-file-alt", "PYQ")}
      </ul>
    </nav>
  );

  function menuItem(path, icon, label) {
    return (
      <li key={path} style={{ marginBottom: "10px" }}>
        <NavLink
          to={path}
          onMouseEnter={() => setHovered(path)}
          onMouseLeave={() => setHovered(null)}
          style={({ isActive }) => {
            const isHover = hovered === path;

            return {
              display: "flex",
              alignItems: "center",
              color: "#fff",
              textDecoration: "none",
              padding: "10px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              background: isActive
                ? "#5B21F4"
                : isHover
                ? "#4C1DDB"
                : "transparent",
              transform: isHover ? "translateX(4px)" : "translateX(0)",
              transition: "all 0.2s ease"
            };
          }}
        >
          <i className={`fa ${icon}`} style={{ minWidth: "20px" }}></i>

          <span
            style={{
              marginLeft: "10px",
              opacity: collapsed ? 0 : 1,
              visibility: collapsed ? "hidden" : "visible",
              transition: "opacity 0.2s ease",
            }}
          >
            {label}
          </span>
        </NavLink>
      </li>
    );
  }
}