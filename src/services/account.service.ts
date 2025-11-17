import API from "@/app/api/axios";
import type { PaginationParam } from "@/types/Common";
import type { CreateAccountPayload } from "@/types/Account";
import axios from "axios";

export const createAccount = async (payload: CreateAccountPayload) => {
  try {
    const res = await API.post("/account", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const getAccount = async (params: PaginationParam) => {
  try {
    const res = await API.get("/bank-admin/accounts", { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const updateExitingAccount = async (
  id: number,
  data: CreateAccountPayload
) => {
  try {
    const res = await API.put(`/account/${id}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const deleteAccount = async (id: number) => {
  try {
    const res = await API.delete(`/account/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};
