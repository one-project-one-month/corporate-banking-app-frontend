import PageLoader from "@/components/core/PageLoader";
import { lazy } from "react";

//layouts
export const MainLayout = PageLoader(
  lazy(() => import("@/components/core/layouts/MainLayout"))
);

export const BankLayout = PageLoader(
  lazy(() => import("@/components/core/layouts/BankLayout"))
);

//Pages
export const OrganizationsPage = PageLoader(
  lazy(() => import("@/features/bank/pages/OrganizationsPage"))
);

export const UsersPage = PageLoader(
  lazy(() => import("@/features/bank/pages/UsersPage"))
);
export const DashboardPage = PageLoader(
  lazy(() => import("@/features/bank/pages/DashboardPage"))
);

export const FAQPage = PageLoader(
  lazy(() => import("@/features/bank/pages/FAQPage"))
);
