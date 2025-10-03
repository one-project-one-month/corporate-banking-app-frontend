import type { BaseResponseWithPagination } from "./Common";

export type BaseDepositTransition = {
  id: string;
  accountType: {
    id: string;
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
  accountTypeId: string;
  accountNumber: string;
  name: string;
  amount: number;
  note: string;
};

export type GetAllDeposit = BaseResponseWithPagination<BaseDepositTransition>;
