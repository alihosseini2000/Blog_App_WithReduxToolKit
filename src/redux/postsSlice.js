import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId) => {
    try {
      const response = await axios.get(`posts/${postId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching single post:", error);
      throw error;
    }
  }
);

export const fetchPostsBySearchTerm = createAsyncThunk(
  "posts/fetchPostsBySearchTerm",
  async (searchTerm) => {
    const response = await axios.get(
      `https://dummyjson.com/posts/search?q=${searchTerm}`
    );
    return response.data.posts;
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUserId",
  async (userId) => {
    return await axios.get(`https://dummyjson.com/posts/user/${userId}`);
  }
);

export const fetchPostsComments = createAsyncThunk(
  "posts/fetchPostsComments",
  async (postId) => {
    return await axios.get(`https://dummyjson.com/posts/${postId}/comments`);
  }
);

export const addNewPost = createAsyncThunk("posts/add", async (newData) => {
  const response = await axios.post("https://dummyjson.com/posts/add", newData);
  return response.data
});

const initialState = {
  status: "idle",
  error: null,
  entities: {},
};

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
        state.entities = action.payload;
        state.status = "success";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.entities.posts.push(action.payload);
      })
      .addCase(fetchPostsBySearchTerm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsBySearchTerm.fulfilled, (state, action) => {
        state.entities.posts = action.payload
        state.status = "success";
      })
      .addCase(fetchPostsBySearchTerm.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

export const selectPosts = (state) => state.entities;
