import { useEffect } from "react";

import "./App.css";

import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./Routes/AppRoutes";

import { useGetMyTasksQuery } from "./Redux/Api/taskApi";
import { useGetProfileQuery } from "./Redux/Api/userApi";

function App() {
  const { data: tasks, error, isLoading, refetch } = useGetMyTasksQuery();

  const { data: userData, isError } = useGetProfileQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  );
}

export default App;
