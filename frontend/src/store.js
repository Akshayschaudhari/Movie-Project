import { configureStore } from "@reduxjs/toolkit";

import SeatSelection from "./Slice/seatNumberSelecction";
import Theaterobject from "./Slice/getshow";
import FilterShowMovie from "./Slice/filterSlice";
import ReviewSlice from "./Slice/reviewSlice";

const store = configureStore({
  reducer: {
    SeatSelection,
    Theaterobject,
    FilterShowMovie,
    ReviewSlice,
  },
});

export default store;
