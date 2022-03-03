import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types";
import { useAppSelector } from "../store/store";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<User, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "/users/signin",
        method: "POST",
        body: { username, password },
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
    signUp: builder.mutation<User, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: "/users/signup",
        method: "POST",
        body: { username, password },
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
    validateUser: builder.query<User, string>({
      query: (token) => ({
        url: "/users/validate",
        headers: {
          Authorization: `token ${token}`,
        },
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useValidateUserQuery } =
  authApi;
