import {
  BankLayout,
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
];

export default bankRouter;
