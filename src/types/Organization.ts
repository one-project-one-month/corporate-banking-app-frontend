import type { BaseResponseWithPagination } from "./Common";

export type CreateOrganizationPayload = {
  name: string;
  selectOrganizationType: string;
  selectDate: string;
  address: string;
  fullName: string;
  registerEmail: string;
  phoneNumber: string;
  userName: string;
};

export type BaseOrganization = {
  id: number;
  name: string;
  selectOrganizationType: string;
  selectDtate: string;
  address: string;
  fullName: string;
  registerEmail: string;
  phoneNumber: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

export type GetAllBaseOrganization =
  BaseResponseWithPagination<BaseOrganization>;
