import axiosInstance from "../utils/axiosInstance";

// ======================= GET ALL USERS ======================= //
export const getUsers = async () => {
  const res = await axiosInstance.get("/auth/admin/users");
  return res.data;
};

// ======================= GET USER DETAILS ======================= //
export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/auth/admin/users/${id}`);
  return res.data;
};

// ======================= DELETE USER ======================= //
export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/auth/admin/users/${id}`);
  return res.data;
};


export const deleteQuiz = async (id) => {
  const res = await axiosInstance.delete(`/material/quiz/${id}`);
  return res.data;
};

