"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/pyqApi";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    users: 0,
    quiz: 0,
    pyq: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await getDashboardStats();

      if (res.status === 1) {
        setStats({
          users: res.data.total_users,
          quiz: res.data.total_quizzes,
          pyq: res.data.total_pyq_papers,
        });
      }

    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* ================= CARDS ================= */}
      <section className="mb-4">
        <div className="row g-4">

          {/* USERS */}
          <div className="col-md-4">
            <div className="card text-white" style={cardPurple}>
              <div className="card-body">
                <p>Total Users</p>
                <h4>{loading ? "..." : stats.users}</h4>
              </div>
            </div>
          </div>

          {/* PYQ */}
          <div className="col-md-4">
            <div className="card text-white bg-dark">
              <div className="card-body">
                <p>Total PYQ</p>
                <h4>{loading ? "..." : stats.pyq}</h4>
              </div>
            </div>
          </div>

          {/* QUIZ */}
          <div className="col-md-4">
            <div className="card text-white bg-success">
              <div className="card-body">
                <p>Total Quiz</p>
                <h4>{loading ? "..." : stats.quiz}</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

// ================= STYLE ================= //

const cardPurple = {
  background: "linear-gradient(135deg,#3D06BA,#7b2ff7)",
};