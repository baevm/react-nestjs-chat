import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://chat.dezzerlol.tech' : 'http://localhost:5000'

interface CustomError {
  data: {
    message: string
    statusCode: number
  }
  status: number
}

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: serverUrl, credentials: 'include' }) as BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomError
>

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, CustomError> = async (args, api, extraOptions) => {
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
