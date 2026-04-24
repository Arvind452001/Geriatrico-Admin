// api/auth.api.js
import axiosInstance from "../utils/axiosInstance";
import { IMAGE_BASE_URL } from "../utils/baseUrlConfig";

// 🔐 SignUp
export const adminSignup = async (name, email, password) => {
  try {
    const res = await axiosInstance.post("/auth/admin-signup", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// 🔐 Login (form-urlencoded)
export const adminLogin = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/admin-login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// 🚪 Logout
export const logout = async () => {
  try {
    const res = await axiosInstance.post("/partner/logout");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};



