// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import Toaster from "../../Components/UI/Toaster";
// export const taskApi = createApi({
//   reducerPath: "taskApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_API_BASE_URL}`, // Replace with your actual base URL
//     credentials: "include", // Necessary for cookie-based authentication
//   }),
//   tagTypes: ["Task"],
//   endpoints: (builder) => ({
//     getMyTasks: builder.query({
//       query: () => "/tasks",
//       providesTags: ["Task"],
//       transformResponse: (response) => {
//         // Reverse the order of the tasks
//         if (response && Array.isArray(response.tasks)) {
//           return {
//             ...response,
//             tasks: response.tasks.slice().reverse(), // Clone and reverse the tasks array
//           };
//         }
//         return response;
//       },
//     }),
//     addTask: builder.mutation({
//       query: (newTask) => ({
//         url: "/tasks",
//         method: "POST",
//         body: newTask,
//       }),
//       async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
//         // Generate a temporary ID and createdAt timestamp for optimistic update
//         const tempId = new Date().getTime().toString();
//         const tempCreatedAt = new Date().toISOString();

//         // Create the task with placeholders for missing fields
//         const taskWithTempId = {
//           ...newTask,
//           _id: tempId, // Temporary ID
//           createdAt: tempCreatedAt, // Temporary creation date
//           completed: false, // Default value for completed
//         };

//         // Optimistically update the UI with the new task
//         const patchResult = dispatch(
//           taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
//             draft.tasks.push(taskWithTempId);
//           })
//         );

//         try {
//           // Wait for the server response
//           await queryFulfilled;
//         } catch {
//           // Revert the UI update if the server request fails
//           patchResult.undo();
//         }
//       },
//       invalidatesTags: ["Task"],
//     }),

//     updateTask: builder.mutation({
//       query: ({ _id, ...updateddData }) => ({
//         url: `/tasks/${_id}`,
//         method: "PATCH",
//         body: updateddData,
//       }),
//       async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
//         // Optimistically update UI before the server response
//         const patchResult = dispatch(
//           taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
//             const task = draft.tasks.find((task) => task._id === _id);
//             if (task) {
//               Object.assign(task, patch);
//             }
//           })
//         );

//         try {
//           // Wait for the server response
//           await queryFulfilled;
//         } catch {
//           // Revert the UI update if the server request fails
//           patchResult.undo();
//         }
//       },
//       invalidatesTags: ["Task"],
//     }),
//     editTask: builder.mutation({
//       query: ({ _id, ...editedData }) => ({
//         url: `/tasks/${_id}`,
//         method: "PUT",
//         body: editedData,
//       }),
//       async onQueryStarted(
//         { _id, ...editedData },
//         { dispatch, queryFulfilled }
//       ) {
//         // Optimistically update the UI with the edited task
//         const patchResult = dispatch(
//           taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
//             const task = draft.tasks.find((task) => task._id === _id);
//             if (task) {
//               Object.assign(task, editedData); // Update the task with the edited data
//             }
//           })
//         );

//         try {
//           // Wait for the server response
//           await queryFulfilled;
//         } catch {
//           // Revert the UI update if the server request fails
//           patchResult.undo();
//         }
//       },
//       invalidatesTags: ["Task"],
//     }),

//     deleteTask: builder.mutation({
//       query: (id) => ({
//         url: `/tasks/${id}`,
//         method: "DELETE",
//       }),
//       async onQueryStarted(id, { dispatch, queryFulfilled }) {
//         // Optimistically update the UI by removing the task
//         const patchResult = dispatch(
//           taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
//             const index = draft.tasks.findIndex((task) => task._id === id);
//             if (index !== -1) {
//               draft.tasks.splice(index, 1); // Remove the task from the list
//             }
//           })
//         );

//         try {
//           // Wait for the server response
//           await queryFulfilled;
//         } catch {
//           // Revert the UI update if the server request fails
//           patchResult.undo();
//         }
//       },
//       invalidatesTags: ["Task"],
//     }),
//     deleteTask: builder.mutation({
//       query: (id) => ({
//         url: `/tasks/${id}`,
//         method: "DELETE",
//       }),
//       async onQueryStarted(id, { dispatch, queryFulfilled }) {
//         // Optimistically update the UI by removing the task
//         const patchResult = dispatch(
//           taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
//             const index = draft.tasks.findIndex((task) => task._id === id);
//             if (index !== -1) {
//               draft.tasks.splice(index, 1); // Remove the task from the list
//             }
//           })
//         );

//         try {
//           // Wait for the server response
//           await queryFulfilled;
//           // Show success toast if the deletion is successful
//           toast(Toaster("success", "Task Deleted successfully!"));
//         } catch (error) {
//           // Revert the UI update if the server request fails
//           patchResult.undo();
//           // Show error toast if the deletion fails
//           if (error.data?.message) {
//             toast(Toaster("error", error.data.message));
//           }
//         }
//       },
//       invalidatesTags: ["Task"],
//     }),
//   }),
// });

// export const {
//   useGetMyTasksQuery,
//   useAddTaskMutation,
//   useUpdateTaskMutation,
//   useEditTaskMutation,
//   useDeleteTaskMutation,
// } = taskApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getMyTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
      transformResponse: (response) => {
        if (response && Array.isArray(response.tasks)) {
          return {
            ...response,
            tasks: response.tasks.slice().reverse(),
          };
        }
        return response;
      },
    }),

    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks",
        method: "POST",
        body: newTask,
      }),
      async onQueryStarted(newTask, { dispatch, queryFulfilled }) {
        const tempId = new Date().getTime().toString();
        const tempCreatedAt = new Date().toISOString();

        const taskWithTempId = {
          ...newTask,
          _id: tempId,
          createdAt: tempCreatedAt,
          completed: false,
        };

        const patchResult = dispatch(
          taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
            draft.tasks.push(taskWithTempId);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Task"],
    }),

    updateTask: builder.mutation({
      query: ({ _id, ...updatedData }) => ({
        url: `/tasks/${_id}`,
        method: "PATCH",
        body: updatedData,
      }),
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
            const task = draft.tasks.find((task) => task._id === _id);
            if (task) {
              Object.assign(task, patch);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Task"],
    }),

    editTask: builder.mutation({
      query: ({ _id, ...editedData }) => ({
        url: `/tasks/${_id}`,
        method: "PUT",
        body: editedData,
      }),
      async onQueryStarted(
        { _id, ...editedData },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
            const task = draft.tasks.find((task) => task._id === _id);
            if (task) {
              Object.assign(task, editedData);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getMyTasks", undefined, (draft) => {
            const index = draft.tasks.findIndex((task) => task._id === id);
            if (index !== -1) {
              draft.tasks.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
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
