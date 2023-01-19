import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:5000'

const baseQuery = fetchBaseQuery({ baseUrl: url, credentials: 'include' })

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
})
