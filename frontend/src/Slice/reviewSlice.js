import { createSlice } from "@reduxjs/toolkit";

const ReviewSlice = createSlice({
  name: "reviewSlice",
  initialState: {
    reviewStatus: 1,
  },
  reducers: {
    setReviewAddCheckAttribute: (state, action) => {
      if (state.reviewStatus) {
        state.reviewStatus = 0;
      } else {
        state.reviewStatus = 1;
      }
    },
  },
});

export default ReviewSlice.reducer;

export const { setReviewAddCheckAttribute } = ReviewSlice.actions;
