import axiosInstance from "../utils/axiosInstance";

// ====================== UPLOAD PYQ ====================== //
// multipart/form-data
export const uploadPyq = async (formData) => {
  try {
    const res = await axiosInstance.post("/pyq/upload", formData);
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== GET ALL PYQ ====================== //
export const getPyqList = async () => {
  try {
    const res = await axiosInstance.get("/pyq/list");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== GET STATS ====================== //
export const getPyqStats = async () => {
  try {
    const res = await axiosInstance.get("/pyq/stats");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== GET SINGLE PYQ ====================== //
export const getPyqById = async (pyq_id) => {
  try {
    const res = await axiosInstance.get(`/pyq/${pyq_id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== DELETE PYQ ====================== //
export const deletePyq = async (pyq_id) => {
  try {
    const res = await axiosInstance.delete(`/pyq/${pyq_id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== GET QUESTIONS ONLY ====================== //
export const getPyqQuestions = async (pyq_id) => {
  try {
    const res = await axiosInstance.get(
      `/pyq/${pyq_id}/questions-only`
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== SUBMIT PYQ ====================== //
// application/json
export const submitPyq = async (payload) => {
  try {
    const res = await axiosInstance.post("/pyq/submit", payload);
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ====================== GET SUBMISSION ====================== //
export const getSubmission = async (submission_id) => {
  try {
    const res = await axiosInstance.get(
      `/pyq/submission/${submission_id}`
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

//====================== DASHBOARD STATS ======================//
export const getDashboardStats = async () => {
  try {
    const res = await axiosInstance.get("/auth/admin/dashboard-stats");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};