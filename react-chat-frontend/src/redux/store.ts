import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import uiReducer from './slices/uiSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    chat: chatReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
