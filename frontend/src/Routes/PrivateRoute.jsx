import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetProfileQuery } from "../Redux/Api/userApi";
import Loader from "../Components/UI/Loader";
const PrivateRoute = () => {
  const { data, isError, isSuccess, isLoading } = useGetProfileQuery();
  const isAuthenticated = data?.success;
  if (isLoading) {
    return <Loader />;
  }
  if (isError || !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (isSuccess && isAuthenticated) return <Outlet />;
  return <Outlet />;
};

export default PrivateRoute;
