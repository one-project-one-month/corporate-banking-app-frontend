import API from "@/app/api/axios";
import type { BankAdminLoginPayload } from "@/types/Auth";
import axios from "axios";

export const bankAdminLogin = async (data: BankAdminLoginPayload) => {
  try {
    const res = await API.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};
