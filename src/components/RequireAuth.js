import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/auth-context";

export const RequireAuth = () => {
  const { authState } = useAuth();
  const location = useLocation();
  return authState?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/register" state={{ from: location }} replace />
  );
};
