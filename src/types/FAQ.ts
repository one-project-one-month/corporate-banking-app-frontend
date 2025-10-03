import type { BaseResponseWithPagination } from "./Common";

export type FAQCreatePayload = {
  question: string;
  answer: string;
  categoryId: string;
};

export type BaseFAQ = {
  id: string;
  question: string;
  answer: string;
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type GetAllFAQResponse = BaseResponseWithPagination<BaseFAQ>;
