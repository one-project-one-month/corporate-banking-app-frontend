import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../constants/lazyload";
import authRouter from "./authRouter";
import bankRouter from "./bankRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  ...authRouter,
  ...bankRouter,
]);

export default router;
