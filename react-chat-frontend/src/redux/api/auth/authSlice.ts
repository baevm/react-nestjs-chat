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

      extraOptions: { maxRetries: 5 },
    }),

    signup: builder.mutation<any, any>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authSlice
