import { createUser } from "@/services/user.service";
import type { CreateUserPayload } from "@/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { toast } from "sonner";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false });
    },
    onError: (err) => {
      toast.error("Error creating user", {
        description() {
          return <div className="text-neutral-800 text-xs">{err.message}</div>;
        },
        position: "top-left",
        icon: <Info size={20} />,
      });
    },
  });
};
