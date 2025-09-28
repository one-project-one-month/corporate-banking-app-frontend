import { BankLayout, DashboardPage, UsersPage } from "../constants/lazyload";

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
        path: "users/create",
        element: <div>Hello</div>,
      },
    ],
  },
];

export default bankRouter;
