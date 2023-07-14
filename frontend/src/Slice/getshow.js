
import { createSlice } from "@reduxjs/toolkit"

const Theaterobject = createSlice({
    name: "gettheaterobject",

    initialState: {
        theaterObject : [],
        language : "",
        format : "",
        duration : "",
        releaseDate: "",
    },
    reducers: {
        settheaterObject: (state, action) => {
            state.theaterObject = action.payload
        },
        setMovieDetails:(state, action)=>{
            state.language = action.payload.language;
            state.format = action.payload.format;
            state.duration = action.payload.Duration
            state.releaseDate = action.payload.date
        }
    }
})

export default Theaterobject.reducer

export const { settheaterObject, setMovieDetails } = Theaterobject.actions