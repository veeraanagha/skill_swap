import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Test from "./components/Test.jsx";
import User from "./User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: "/user/register",
            element: <Register />,
          },
          {
            path: "/user/login",
            element: <Login />,//
          },
          {
            path: "/user/profile",
            element: <Register />,//
          },
          {
            path: "/user/update-profile",
            element: <Register />,//
          }
        ]
      },
      {
        path: "/test",
        element: <Test />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
