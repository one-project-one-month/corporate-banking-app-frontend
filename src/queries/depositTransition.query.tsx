import { errorToast } from "@/lib/helpers/customToast";
import {
  createDeposit,
  getDeposits,
  updateExistiongDeposit,
  deleteDeposit,
} from "@/services/depositTransition.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type {
  BaseDepositTransition,
  CreateDepositPayload,
  GetAllDeposit,
} from "@/types/DepositTransition";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Create Deposit
export const useCreateDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDepositPayload) => createDeposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Creating Deposit", err.message);
    },
  });
};

// Update Deposit
export const useUpdateDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateDepositPayload }) =>
      updateExistiongDeposit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Updating Deposit", err.message);
    },
  });
};

// Delete Deposit
export const useDeleteDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDeposit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposits"], exact: false });
    },
    onError: (err: any) => {
      errorToast("Error Deleting Deposit", err.message);
    },
  });
};

// Get Deposits with pagination
export const useGetDeposits = (params: PaginationParam) => {
  return useQuery<GetAllDeposit & WithPagination>({
    queryKey: ["deposits", params.page, params.pageSize],
    queryFn: () => getDeposits(params),
    select: (data) => {
      const totalPages = Math.ceil(
        data?.pagination.total / (params?.pageSize ?? 5)
      );
      return {
        ...data,
        totalPages,
        hasNextPage: (params?.page ?? 1) < totalPages,
        hasPreviousPage: (params?.page ?? 1) > 1,
      };
    },
  });
};
