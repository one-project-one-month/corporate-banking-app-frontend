import API from "@/app/api/axios";
import type { FAQCreatePayload } from "@/types/FAQ";
import axios from "axios";

export const createFAQ = async (data: FAQCreatePayload) => {
  try {
    const res = await API.post("/faqs", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};
