import type { BaseResponseWithPagination } from "./Common";

export type CreateAccountPayload = {
  accountNumber: number;
  accountHolder: string;
  accountType: string;
  status: boolean;
};

export type BaseAccount = {
  id: number;
  accountNumber: number;
  accountHolder: string;
  accountType: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

export type GetAllBaseAccount = BaseResponseWithPagination<BaseAccount>;
