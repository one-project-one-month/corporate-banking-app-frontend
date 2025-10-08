import API from "@/app/api/axios";
import type { PaginationParam } from "@/types/Common";
import type { FAQCreatePayload } from "@/types/FAQ";
import axios from "axios";

// Create FAQ
export const createFaq = async (payload: FAQCreatePayload) => {
  try {
    const res = await API.post("/faqs", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const deleteFaq = async (id: number) => {
  try {
    const res = await API.delete(`/faqs/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

// Get FAQs (with pagination)
export const getFaq = async (params: PaginationParam) => {
  try {
    const res = await API.get("/faqs", { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

// Update FAQ
export const updateExistingFaq = async (id: number, data: FAQCreatePayload) => {
  try {
    const res = await API.put(`/faqs/${id}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};
