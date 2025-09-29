import { errorToast } from "@/lib/helpers/customToast";
import { bankAdminLogin } from "@/services/auth.service";
import type { BankAdminLoginPayload } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";

export const useBankAdminLogin = () => {
  return useMutation({
    mutationFn: (data: BankAdminLoginPayload) => bankAdminLogin(data),
    onError: (err) => {
      errorToast("Login Failed", err.message);
    },
  });
};
