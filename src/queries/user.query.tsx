import { errorToast } from "@/lib/helpers/customToast";
import {
  createUser,
  getUsers,
  updateExistingUser,
} from "@/services/user.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type { GetAllUserResponse, CreateUserPayload } from "@/types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    mutationFn: ({ id, data }: { id: string; data: CreateUserPayload }) =>
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
