import type { BaseResponseWithPagination } from "./Common";

export type FAQCreatePayload = {
  id: number;
  question: string;
  answer: string;
  // status: "published" | "draft";
  faqCategoryId: number;
};

export type BaseFAQ = {
  id: number;
  question: string;
  answer: string;
  faqCategoryId: number;
  // category: {
  //   id: number;
  //   name: string;
  // };
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
};

export type GetAllFAQResponse = BaseResponseWithPagination<BaseFAQ>;
