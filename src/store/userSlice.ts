import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "Anonymous#4253",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload as string;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
