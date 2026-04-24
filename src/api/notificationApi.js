import axiosInstance from "../utils/axiosInstance";

// ======================= CREATE NOTIFICATION ======================= //
export const createNotification = async (payload) => {
  try {
    const params = new URLSearchParams();

    params.append("title", payload.title);
    params.append("message", payload.message);
    params.append("notification_type", payload.notification_type || "general");
    params.append("parent_id", payload.parent_id);

    const res = await axiosInstance.post(
      "/admin/notifications",
      params
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ======================= GET ALL NOTIFICATIONS ======================= //
export const getNotifications = async () => {
  try {
    const res = await axiosInstance.get(
      "/admin/notifications"
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};