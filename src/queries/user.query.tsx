import { errorToast } from "@/lib/helpers/customToast";
import { createUser, getUsers } from "@/services/user.service";
import type { CreateUserPayload } from "@/types/User";
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

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
