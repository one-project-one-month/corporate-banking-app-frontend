import { errorToast } from "@/lib/helpers/customToast";
import { createOrganization } from "@/services/organization.service";
import type { CreateOrganizationPayload } from "@/types/Organization";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationPayload) => createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
    onError: (err) => {
      errorToast("Error Creating Organization", err.message);
    },
  });
};
