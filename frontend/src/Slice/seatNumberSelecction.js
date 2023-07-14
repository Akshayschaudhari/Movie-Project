
import { createSlice } from "@reduxjs/toolkit"

const SeatSelection = createSlice({
    name: "flaglogin",
    initialState: {
        totalSeat: 0,
        seatNumbers: [],
        silverseatNumbers: [],
        goldseatNumbers: [],
        rowSeatQty: 0,
        totalprice: 0,
        theaterObject : [],
        role: "User",
        city:""
        
    },
    reducers: {
        userCity :(state, action) => {
            state.city = action.payload.userCityValue
        },
        userRole :(state, action) => {
            state.role = action.payload.userRoleValue
        },
        Totalseatcount: (state, action) => {

        },
        seatNumbersStore: (state, action) => {
            const flag = state.seatNumbers.findIndex((i) => {
                return i === action.payload.seatId

            })
            if (flag === -1) {
                const flag1 = state.silverseatNumbers.findIndex((ab) => {
                    return ab.i === action.payload.seatId

                })
                if (flag1 === -1) {
                    state.totalprice += state.goldseatNumbers[0].price
                } else {
                    state.totalprice += state.silverseatNumbers[0].price
                }
                state.seatNumbers.push(action.payload.seatId)
            } else {
                const flag1 = state.silverseatNumbers.findIndex((ab) => {
                    return ab.i === action.payload.seatId

                })
                if (flag1 === -1) {
                    state.totalprice -= state.goldseatNumbers[0].price
                } else {
                    state.totalprice -= state.silverseatNumbers[0].price
                }
                state.seatNumbers.splice(flag, 1)
            }
            state.totalSeat = state.seatNumbers.length

        }
        , reseatNumbersStore: (state, action) => {
            state.seatNumbers = []
        },
        reseatAmount: (state, action) => {
            state.totalprice = 0
        }, reseattotalseat: (state, action) => {
            state.totalSeat = 0
        },
        storeabc: (state, action) => {
            if(action.payload.a === 1)
            {
            state.theaterObject = action.payload.r
            }
            else{
            let A = action.payload.result
            state.silverseatNumbers = A[0]
            state.goldseatNumbers = A[1]
            let rowQty = 50
            for (let a = 0; a < A[2]; a++) {
                rowQty += 50;
            }
            state.rowSeatQty = rowQty
        }
        }
        ,setstatus: (state, action) => {

            if (action.payload.type === 1) {
                const index = state.goldseatNumbers.findIndex((I) => {
                    return (action.payload.id + state.silverseatNumbers.length) === I.i
                })
                if (state.goldseatNumbers[index].selectstatus) {
                    state.goldseatNumbers[index].selectstatus = false
                } else {
                    state.goldseatNumbers[index].selectstatus = true
                }
            } else {
                const index = state.silverseatNumbers.findIndex((I) => {
                    return action.payload.id === I.i
                })
                if (state.silverseatNumbers[index].selectstatus) {
                    state.silverseatNumbers[index].selectstatus = false
                } else {
                    state.silverseatNumbers[index].selectstatus = true
                }
            }
        }
    }
})

export default SeatSelection.reducer

export const { Totalseatcount, seatNumbersStore, storeabc, setstatus, reseatNumbersStore, reseatAmount, reseattotalseat,userRole,userCity } = SeatSelection.actions