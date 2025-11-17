import type { BaseResponseWithPagination } from "./Common";

// export type BaseDepositTransition = {
//   id: number;
//   accountType: {
//     id: number;
//     name: string;
//   };
//   accountNumber: string;
//   name: string;
//   amount: number;
//   note: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type CreateDepositPayload = {
//   accountTypeId: number;
//   accountNumber: string;
//   name: string;
//   amount: number;
//   note: string;
// };

export type BaseDepositTransition = {
  id: number;
  transactionId: number;
  accountId: number;
  amount: number;
  transactionType:
    | "payroll"
    | "annual salary payment"
    | "merchant payment"
    | string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
};

export type CreateDepositPayload = {
  transactionId: number;
  accountId: number;
  amount: number;
  transactionType: "payroll" | "annual salary payment" | "merchant payment";
  status: boolean;
};

export type GetAllDeposit = BaseResponseWithPagination<BaseDepositTransition>;
