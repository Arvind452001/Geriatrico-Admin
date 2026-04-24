import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      <Sidebar collapsed={collapsed} />

      <div
        style={{
          flex: 1,
          marginLeft: collapsed ? "70px" : "240px",
          transition: "margin-left 0.3s ease",
          width: "100%"
        }}
      >
        <Header
          title="Admin Panel"
          toggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main className="p-3">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}