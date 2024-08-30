import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-todo-rtk-query.vercel.app",
    credentials: "include", // Necessary for cookie-based authentication
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/users/profile",
      providesTags: ["User"],
      refetchOnMountOrArgChange: true, // Ensure fresh data on mount or arg change
      keepUnusedDataFor: 0, // Do not keep data in the cache
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"], // Invalidate cache on register
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"], // Invalidate cache on login
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"], // Invalidate cache on logout
    }),
    getAllUsers: builder.query({
      query: () => "/users/data",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
  useGetAllUsersQuery,
} = userApi;
