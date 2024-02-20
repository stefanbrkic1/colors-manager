import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const URL = "https://www.csscolorsapi.com/api/colors";

export const fetchColors = createAsyncThunk("colors/fetchColors", async () => {
  try {
    const response = await fetch(URL, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Error: Service Error");
    }

    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

const colorsSlice = createSlice({
  name: "colors",
  initialState: {
    loading: true,
    colorsData: [],
    error: null,
  },
  reducers: {
    remove: (state, action) => {
      state.colorsData.colors = state.colorsData.colors.filter(
        (color) => color.name !== action.payload
      );
    },
    add: (state, action) => {
      state.colorsData.colors = [action.payload, ...state.colorsData.colors];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchColors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.loading = false;
      state.colorsData = action.payload;
    });
    builder.addCase(fetchColors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { remove, add } = colorsSlice.actions;

export default colorsSlice.reducer;
