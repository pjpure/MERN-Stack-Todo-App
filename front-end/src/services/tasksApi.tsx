import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types";
import { useAppSelector } from "../store/store";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `token ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    tasks: builder.query<Task[], string | undefined>({
      query: (userId) => `/tasks/${userId}`,
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<Task, { task: any; userId: string }>({
      query: ({ task, userId }) => ({
        url: `/tasks/${userId}`,
        method: "POST",
        body: task,
      }),
      transformResponse: (response: { data: Task }) => response.data,
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<Task, { id: string; task: any }>({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: task,
      }),
      transformResponse: (response: { data: Task }) => response.data,
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
