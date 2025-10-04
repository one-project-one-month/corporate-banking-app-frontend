import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      navigate("/bank/auth/login");
      return;
    }
  }, [accessToken, navigate]);

  return <div>{children}</div>;
}

export default ProtectedRoute;
