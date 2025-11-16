import { errorToast } from "@/lib/helpers/customToast";
import {
  createUser,
  deleteUser,
  getUsers,
  statusConfirmUser,
  updateExistingUser,
} from "@/services/user.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type { GetAllUserResponse, CreateUserPayload } from "@/types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { boolean } from "zod";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
    onError: (err) => {
      errorToast("Error Creating User", err.message);
    },
  });
};

export const useUpdateExistingUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateUserPayload }) =>
      updateExistingUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
    onError: (err) => {
      errorToast("Error Updating User", err.message);
    },
  });
};

export const useGetUsers = (params: PaginationParam) => {
  return useQuery<GetAllUserResponse & WithPagination>({
    queryKey: ["users", params.page, params.pageSize],
    queryFn: () => getUsers(params),
    select: (data) => {
      // const totalPages = Math.ceil(
      //   data?.pagination.total / (params?.pageSize ?? 5)
      // );

      const totalCount = data?.data?.users?.length ?? 0;

      const totalPages = Math.ceil(totalCount / (params.pageSize ?? 5));
      return {
        ...data,
        totalCount,
        totalPages,
        hasNextPage: (params?.page ?? 1) < totalPages,
        hasPreviousPage: (params?.page ?? 1) > 1,
      };
    },
  });
};

export const useStatusConfirmUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      action,
    }: {
      userId: number;
      action: "APPROVE" | "REJECT";
    }) => {
      return await statusConfirmUser(userId, action);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log("Status update failed:", error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
    onError: (err) => {
      errorToast("Error Deleting User", err.message);
    },
  });
};
