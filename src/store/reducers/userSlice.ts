import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../constants/firebaseConfig";

const initialState = {
  data: null,
  status: "idle",
  error: null,
} as {
  data: null | UserDataType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload as UserDataType;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
