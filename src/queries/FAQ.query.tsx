import { errorToast } from "@/lib/helpers/customToast";
import {
  createFaq,
  deleteFaq,
  getFaq,
  updateExistingFaq,
} from "@/services/FAQ.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type { GetAllFAQResponse, FAQCreatePayload } from "@/types/FAQ";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Create FAQ
export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FAQCreatePayload) => createFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Creating FAQ", err.message);
    },
  });
};

export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (faqId: number) => deleteFaq(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Deleting FAQ", err.message);
    },
  });
};

// Update FAQ
export const useUpdateExistingFaq = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ faqId, data }: { faqId: number; data: FAQCreatePayload }) =>
      updateExistingFaq(faqId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Updating FAQ", err.message);
    },
  });
};

// Get FAQs with pagination
export const useGetFaq = (params: PaginationParam) => {
  return useQuery<GetAllFAQResponse & WithPagination>({
    queryKey: ["faqs", params.page, params.pageSize],
    queryFn: () => getFaq(params),
    select: (data) => {
      // const totalPages = Math.ceil(
      //   data?.pagination.total / (params?.pageSize ?? 5)
      // );

      const totalCount = data?.data?.faqs?.length ?? 0;
      const totalPages = Math.ceil(totalCount / (params.pageSize ?? 5));
      return {
        ...data,
        totalPages,
        totalCount,
        hasNextPage: (params?.page ?? 1) < totalPages,
        hasPreviousPage: (params?.page ?? 1) > 1,
      };
    },
  });
};
