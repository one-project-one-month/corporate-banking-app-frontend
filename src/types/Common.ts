export type BaseResponse<T> = {
  code: number;
  message: string;
  data: T[];
};

export type BaseResponseWithPagination<T> = BaseResponse<T> & {
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  total: number;
  pageSize: number;
};

export type PaginationParam = {
  page?: number;
  pageSize?: number;
};

export type WithPagination = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
};
