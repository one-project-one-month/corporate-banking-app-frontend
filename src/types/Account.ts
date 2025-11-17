import type { BaseResponseWithPagination } from "./Common";

export type AccountType = {
  id: number;
  name: string | null;
};
export type CreateAccountPayload = {
  accountNumber: number;
  accountHolder: AccountType;
  accountType: string;
  status: boolean;
};

export type BaseAccount = {
  id: number;
  accountNumber: number;
  accountHolder: string;
  accountType: AccountType;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

export type GetAllBaseAccount = BaseResponseWithPagination<BaseAccount>;
