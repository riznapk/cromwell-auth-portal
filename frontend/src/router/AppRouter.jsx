import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import UnderConstruction from "../common/components/UnderConstruction";
import Account from "../features/userAccount/Account";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/create-account",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/my-account", element: <Account /> },
          {
            path: "/wip",
            element: <UnderConstruction />,
          },
        ],
      },
    ],
  },
]);
