import { configureStore } from "@reduxjs/toolkit";

import appReducer from './features/appSlice'

import { bitcoinApi } from "./services";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [bitcoinApi.reducerPath]: bitcoinApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bitcoinApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch