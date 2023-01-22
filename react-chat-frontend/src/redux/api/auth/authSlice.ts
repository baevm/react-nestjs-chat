import { apiSlice } from '../apiSlice'

type LoginResponse = {
  access_token: string
  refresh_token: string
  error?: {
    message: string
    status: number
  }
}

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, any>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    signup: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authSlice
