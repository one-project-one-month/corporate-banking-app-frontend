import Cookies from "js-cookie";

// example usecase: const hasViewPermission = usePermission(["admin", "maker"]);
function usePermission(allowedRoles: string | string[]) {
  const role = Cookies.get("role");

  if (!role) return false;

  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(role);
  }

  return role === allowedRoles;
}

export default usePermission;
