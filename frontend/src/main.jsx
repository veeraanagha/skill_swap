import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/User/Register.jsx";
import Login from "./components/User/Login.jsx";
import Home from "./components/Home/Home.jsx";
import User from "./components/User/User.jsx";
import Profile from "./components/User/Profile/Profile.jsx";

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
            element: <Profile />,//
          },
          {
            path: "/user/update-profile",
            element: <Register />,//
          }
        ]
      },
      {
        path: "/home",
        element: <Home />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
