import {
  BankLayout,
  BankLoginPage,
  DashboardPage,
  FAQPage,
  OrganizationsPage,
  UsersPage,
} from "../constants/lazyload";

const bankRouter = [
  {
    path: "/bank",
    element: <BankLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
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
    ],
  },
  {
    path: "/bank/auth/login",
    element: <BankLoginPage />,
  },
];

export default bankRouter;
