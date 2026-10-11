import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    coins: [],
    isLoading: false,
    error: "",
  },
  reducers: {
    setCoins: (state, action) => {
      state.coins = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCoins, setLoading, setError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
