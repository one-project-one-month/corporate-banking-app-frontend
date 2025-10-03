import { errorToast } from "@/lib/helpers/customToast";
import {
  createOrganization,
  getOrganization,
  updateExistingOrganization,
} from "@/services/organization.service";
import type { PaginationParam, WithPagination } from "@/types/Common";
import type {
  CreateOrganizationPayload,
  GetAllBaseOrganization,
} from "@/types/Organization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useUpdateExistingOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateOrganizationPayload;
    }) => updateExistingOrganization(id, data),

    onSuccess: () => {
      // refetch organization list after update
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
        exact: false,
      });
    },

    onError: (err: any) => {
      errorToast("Error Updating Organization", err.message);
    },
  });
};

export const useGetOrganizations = (params: PaginationParam) => {
  return useQuery<GetAllBaseOrganization & WithPagination>({
    queryKey: ["users", params.page, params.pageSize],
    queryFn: () => getOrganization(params),
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
