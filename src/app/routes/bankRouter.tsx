import {
  BankLayout,
  BankLoginPage,
  DashboardPage,
  DepositTransitionPage,
  FAQPage,
  OrganizationsPage,
  UsersPage,
  AccountPage,
} from "../constants/lazyload";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const bankRouter = [
  {
    path: "/bank",
    element: (
      // <ProtectedRoute>
      <BankLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "accounts",
        element: <AccountPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "organizations",
        element: <OrganizationsPage />,
      },
      {
        path: "FAQ",
        element: <FAQPage />,
      },
      {
        path: "deposit-transition",
        element: <DepositTransitionPage />,
      },
    ],
  },
  {
    path: "/bank/auth/login",
    element: <BankLoginPage />,
  },
];

export default bankRouter;
