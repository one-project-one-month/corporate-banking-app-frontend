import type { BaseResponseWithPagination } from "./Common";

export type CreateOrganizationPayload = {
  name: string;
  shortCode: string;
  address: string;
  country: string;
  createBy: string;
};

export type BaseOrganization = {
  id: number;
  name: string;
  shortcode: string;
  address: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

export type GetAllBaseOrganization =
  BaseResponseWithPagination<BaseOrganization>;
