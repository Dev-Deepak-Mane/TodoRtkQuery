import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Navbar from "../Components/UI/Navbar";

export const AppRoutes = createBrowserRouter([
  {
    path: "/",

    element: <Navbar />, // Navbar as a common layout
    children: [
      {
        path: "/",
        element: <PrivateRoute />, // Protect routes inside
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <Profile /> },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);
