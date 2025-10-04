import type { BaseResponseWithPagination } from "./Common";

export type BaseDepositTransition = {
  id: number;
  accountType: {
    id: number;
    name: string;
  };
  accountNumber: string;
  name: string;
  amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDepositPayload = {
  accountTypeId: number;
  accountNumber: string;
  name: string;
  amount: number;
  note: string;
};

export type GetAllDeposit = BaseResponseWithPagination<BaseDepositTransition>;
