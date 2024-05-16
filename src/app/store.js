import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../redux/usersSlice";
import postsSlice from '../redux/postsSlice';

// const rootReducer = combineReducers({
//     posts: postsSlice,
//     users: usersSlice
// })

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    users: usersSlice,
  },
  // devTools: import.meta.env.NODE_ENV !== 'production', // فقط در محیط توسعه فعال می‌شود
});
