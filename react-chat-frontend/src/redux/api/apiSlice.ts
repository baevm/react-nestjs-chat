import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const url = 'http://localhost:5000'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: url, credentials: 'include' })

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions)
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions)
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ['User', 'Chats'],
})
