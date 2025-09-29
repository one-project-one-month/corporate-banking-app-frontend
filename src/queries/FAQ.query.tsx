import { errorToast } from "@/lib/helpers/customToast";
import { createFAQ } from "@/services/FAQ.service";
import type { FAQCreatePayload } from "@/types/FAQ";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FAQCreatePayload) => createFAQ(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"], exact: false });
    },
    onError: (err) => {
      errorToast("Error Create FAQ", err.message);
    },
  });
};
