import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.Backend_Url}/users`,
    credentials: "include", // Necessary for cookie-based authentication
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"],
      refetchOnMountOrArgChange: true, // Ensure fresh data on mount or arg change
      keepUnusedDataFor: 0, // Do not keep data in the cache
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"], // Invalidate cache on register
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"], // Invalidate cache on login
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"], // Invalidate cache on logout
    }),
    getAllUsers: builder.query({
      query: () => "/data",
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
