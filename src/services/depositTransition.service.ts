import API from "@/app/api/axios";
import type { PaginationParam } from "@/types/Common";
import type { CreateDepositPayload } from "@/types/DepositTransition";
import axios from "axios";

// Create Deposit
export const createDeposit = async (payload: CreateDepositPayload) => {
  try {
    const res = await API.post("/deposit", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};

// Get Deposits (with pagination)
export const getDeposits = async (params: PaginationParam) => {
  try {
    const res = await API.get("/deposit", { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};

// Update Deposit
export const updateExistiongDeposit = async (
  id: number,
  data: CreateDepositPayload
) => {
  try {
    const res = await API.put(`/deposit/${id}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};

// Delete Deposit
export const deleteDeposit = async (id: number) => {
  try {
    const res = await API.delete(`/deposit/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error(String(error));
  }
};
