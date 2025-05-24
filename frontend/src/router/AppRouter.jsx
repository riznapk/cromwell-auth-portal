import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

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
        element: <Login />,
      },
      {
        path: "/create-account",
        element: <Register />,
      },
    ],
  },
]);
