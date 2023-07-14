import { createSlice } from "@reduxjs/toolkit";

const FilterShowMovie = createSlice({
  name: "FilterMovies",
  initialState: {
    genreSelected: "",
    formatSelected: "",
    languageSelected: "",
  },
  reducers: {
    setGenreSelected: (state, action) => {
      state.genreSelected = action.payload;
     
    },
    setFormatSelected: (state, action) => {
      state.formatSelected = action.payload;
    
    },
    setLanguageSelected: (state, action) => {
      state.languageSelected = action.payload;
   
    },
  },
});

export default FilterShowMovie.reducer;

export const { setGenreSelected, setFormatSelected, setLanguageSelected } =
  FilterShowMovie.actions;
