import type { BaseResponseWithPagination } from "./Common";

export type CreateUserPayload = {
  fullName: string;
  dateOfBirth: string;
  genderId: number;
  email: string;
};

export type BaseUser = {
  id: number;
  fullName: string;
  dateOfBirth: string;
  genderId: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllUserResponse = BaseResponseWithPagination<BaseUser>;
