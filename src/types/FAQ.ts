import type { BaseResponseWithPagination } from "./Common";

export type FAQCreatePayload = {
  question: string;
  answer: string;
  categoryId: number;
};

export type BaseFAQ = {
  id: number;
  question: string;
  answer: string;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetAllFAQResponse = BaseResponseWithPagination<BaseFAQ>;
