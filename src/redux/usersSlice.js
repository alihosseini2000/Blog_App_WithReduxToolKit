import {
  createAsyncThunk,
  // createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get("users");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
});

// const usersAdapter = createEntityAdapter();

// const initialState = usersAdapter.getInitialState({
//   status: "idle",
//   error: null,
// });

const initialState = {
  status: 'idle' ,
  error: null,
  usersList:{}
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // usersAdapter.upsertMany(state, action.payload);
        state.usersList = action.payload
        state.status = "success";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
