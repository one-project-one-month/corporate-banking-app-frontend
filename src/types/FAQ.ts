import type { BaseResponseWithPagination } from "./Common";

export type FAQCreatePayload = {
  question: string;
  answer: string;
  status: "published" | "draft";
};

export type BaseFAQ = {
  id: number;
  question: string;
  answer: string;
  // category: {
  //   id: number;
  //   name: string;
  // };
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
};

export type GetAllFAQResponse = BaseResponseWithPagination<BaseFAQ>;
