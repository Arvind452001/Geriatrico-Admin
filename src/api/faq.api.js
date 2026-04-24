// api/faq.api.js
import axiosInstance from "../utils/axiosInstance";

// ======================= GET ALL FAQs ======================= //
export const getFaqs = async () => {
  try {
    const res = await axiosInstance.get("/admin/faqs");
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ======================= CREATE FAQ ======================= //
export const createFaq = async (payload) => {
  try {
    const params = new URLSearchParams();

    params.append("question", payload.question);
    params.append("answer", payload.answer);
    params.append("is_active", true); // optional

    const res = await axiosInstance.post(
      "/admin/faqs",
      params
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ======================= UPDATE FAQ ======================= //
export const updateFaq = async (id, payload) => {
  try {
    const params = new URLSearchParams();

    params.append("question", payload.question);
    params.append("answer", payload.answer);
    params.append("is_active", payload.is_active);

    const res = await axiosInstance.put(
      `/admin/faqs/${id}`, // adjust based on baseURL
      params
    );

    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// ======================= DELETE FAQ ======================= //
export const deleteFaq = async (id) => {
  try {
    const res = await axiosInstance.delete(
      `/admin/faqs/${id}`
    );
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};


// ===============api/contact.api.js===================//
export const getContactMessages = async () => {
  try {
    const res = await axiosInstance.get("/admin/contact-messages"); 
    // 🔁 adjust if endpoint is different
    return res.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};