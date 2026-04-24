import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

import AdminLayout from "./adminLayout/AdminLayout";
import Signup from "./pages/Signup";
import QuizPage from "./pages/QuizPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import PyqPage from "./pages/PyqPage";
import AddPyq from "./pages/AddPyq";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>

          {/* 🔓 PUBLIC ROUTES */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Users */}
            <Route path="/users" element={<Users />} />
            <Route path="/user-details/:id" element={<UserDetails />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            <Route path="/pyq" element={<PyqPage />} />
            <Route path="/add-pyq" element={<AddPyq />} />
          </Route>

          {/* ❌ 404 PAGE */}
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;