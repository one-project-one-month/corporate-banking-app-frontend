import API from "@/app/api/axios";
import type { PaginationParam } from "@/types/Common";
import type { CreateOrganizationPayload } from "@/types/Organization";
import axios from "axios";

export const createOrganization = async (
  payload: CreateOrganizationPayload
) => {
  try {
    const res = await API.post("/organizations", payload);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const getOrganization = async (params: PaginationParam) => {
  try {
    const res = await API.get("/organizations", { params });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};

export const updateExistingOrganization = async (
  id: string,
  data: CreateOrganizationPayload
) => {
  try {
    const res = await API.put(`/organizations/${id}`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }

    throw new Error(String(error));
  }
};
