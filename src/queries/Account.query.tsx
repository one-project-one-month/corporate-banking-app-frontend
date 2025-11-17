import { errorToast } from "@/lib/helpers/customToast";
import {
  createAccount,
  getAccount,
  updateExitingAccount,
  deleteAccount,
} from "@/services/account.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type { CreateAccountPayload, GetAllBaseAccount } from "@/types/Account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountPayload) => createAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (err) => {
      errorToast("Error Creating Account", err.message);
    },
  });
};

export const useUpdateExistingAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateAccountPayload }) =>
      updateExitingAccount(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        exact: false,
      });
    },

    onError: (error: any) => {
      errorToast("Error updating Accounts", error.message);
    },
  });
};

export const useGetAccount = (params: PaginationParam) => {
  return useQuery<GetAllBaseAccount & WithPagination>({
    queryKey: ["users", params.page, params.pageSize],
    queryFn: () => getAccount(params),
    select: (data) => {
      // const totalPages = Math.ceil(
      //   data?.pagination.total / (params?.pageSize ?? 5)
      // );

      const totalCount = data?.data?.accounts?.lenght ?? 0;
      const totalPages = Math.ceil(totalCount / (params.pageSize ?? 5));
      return {
        ...data,
        totalPages,
        hasNextPage: (params?.page ?? 1) < totalPages,
        hasPreviousPage: (params?.page ?? 1) > 1,
      };
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["account"],
        exact: true,
      });
    },

    onError: (err) => {
      errorToast("Error Deleting Account", err.message);
    },
  });
};
