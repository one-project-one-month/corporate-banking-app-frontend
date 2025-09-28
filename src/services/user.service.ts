import API from "@/app/api/axios";
import type { CreateUserPayload } from "@/types/User";
import axios from "axios";

export const createUser = async (data: CreateUserPayload) => {
  try {
    const res = await API.post("/users", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const getUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};
