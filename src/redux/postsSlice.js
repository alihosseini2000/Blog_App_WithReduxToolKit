import {
  createAsyncThunk,
  // createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get("posts");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch posts");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
});

// const postsAdapter = createEntityAdapter({
//   selectId: (instance) => instance.toString(),
// });

// const initialState = postsAdapter.getInitialState({
//   status: "idle",
//   error: null,
// });

const initialState = {
  status: 'idle' ,
  error: null,
  entities:{}
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // postsAdapter.upsertMany(state, action.payload);
        state.entities = action.payload
        state.status = "success";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.entities
