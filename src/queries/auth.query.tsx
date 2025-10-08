import { setAccessToken, setRefreshToken } from "@/features/auth/authSlice";
import { errorToast } from "@/lib/helpers/customToast";
import { bankAdminLogin } from "@/services/auth.service";
import type { BankAdminLoginPayload } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useBankAdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data: BankAdminLoginPayload) => bankAdminLogin(data),
    onSuccess: (data) => {
      dispatch(setAccessToken(data.accessToken));
      dispatch(setRefreshToken(data.refreshToken));
      navigate("/bank");
    },
    onError: (err) => {
      errorToast("Login Failed", err.message);
    },
  });
};
