import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.Backend_Url}`, // Replace with your actual base URL
    credentials: "include", // Necessary for cookie-based authentication
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getMyTasks: builder.query({
      query: () => "/",
      providesTags: ["Task"],
      transformResponse: (response) => {
        // Reverse the order of the tasks
        if (response && Array.isArray(response.tasks)) {
          return {
            ...response,
            tasks: response.tasks.slice().reverse(), // Clone and reverse the tasks array
          };
        }
        return response;
      },
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ _id, ...updateddData }) => ({
        url: `/${_id}`,
        method: "PATCH",
        body: updateddData,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistically update UI before the server response
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
            const task = draft.tasks.find((task) => task._id === _id);
            if (task) {
              Object.assign(task, patch);
            }
          })
        );

        try {
          // Wait for the server response
          await queryFulfilled;
        } catch {
          // Revert the UI update if the server request fails
          patchResult.undo();
        }
      },
      invalidatesTags: ["Task"],
    }),
    editTask: builder.mutation({
      query: ({ _id, ...editedData }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: editedData,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
