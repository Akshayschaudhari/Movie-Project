import { useDispatch, useSelector } from "react-redux"
import { Totalseatcount, seatNumbersStore, setstatus } from "../Slice/seatNumberSelecction"


function Screen() {

    const screenphoto = require("./SelectSeatImages/screen.png")
    let i=1
    const rowSeatQty = useSelector((state) => state.SeatSelection.rowSeatQty)

    const silverseatcount = useSelector((state) => state.SeatSelection.silverseatNumbers)
    const goldenseatcount = useSelector((state) => state.SeatSelection.goldseatNumbers)

    const seatimageblue = require("./SelectSeatImages/blue.png")
    const seatimagepink = require("./SelectSeatImages/pink.png")
    const seatimagegrey = require("./SelectSeatImages/grey.png")

    const dispatch = useDispatch()

    function selectseat(seat, seatcount, type) {

        if (seatcount[seat - 1].selectstatus) {
            const obj = { seatstatus: false, id: seat, type: type }
            dispatch(setstatus(obj))
        } else {
            const obj = { seatstatus: false, id: seat, type: type }
            dispatch(setstatus(obj))
        }
        dispatch(Totalseatcount())
        if (type == 0) {
            dispatch(seatNumbersStore({ seatId: seat }))
        }
        else {
            dispatch(seatNumbersStore({ seatId: seat + silverseatcount.length }))
        }
    }

    return (
        <center>
            <div style={{ textAlign: "center", width: rowSeatQty, border: "solid", padding: 0, borderRadius: 10, boxShadow: '1px 1px 20px 5px #C9C9C9' }}>
                <center>
                    <h2 style={{ marginBottom: 5 }}>Screen</h2>
                    <img src={screenphoto} style={{ width: "80%", height: "0%" }}></img>
                </center>
                <br></br>
                {silverseatcount.map((seat) => {
                    return (
                        <button disabled={seat.available} key={i++} style={{ border: 'none', backgroundColor: 'transparent', margin: 5, padding: 0 }} onClick={() => {

                            selectseat(seat.i, silverseatcount, 0)
                        }}><img className="img-responsive" src={seat.available ? seatimagegrey : (silverseatcount[seat.i - 1].selectstatus ? seatimageblue : seatimagepink)}
                            style={{ width: "80%", height: "2%" }} ></img></button>
                    )
                })}
                <hr></hr>
                {goldenseatcount.map((seat) => {
                    return (
                        <button disabled={seat.available} key={i++} style={{ border: 'none', backgroundColor: 'transparent', margin: 5, padding: 0 }} onClick={() => {
                            selectseat(seat.i - goldenseatcount.length + (goldenseatcount.length - silverseatcount.length), goldenseatcount, 1)
                        }}><img className="img-responsive" src={seat.available ? seatimagegrey : (goldenseatcount[(seat.i - silverseatcount.length) - 1].selectstatus ? seatimageblue : seatimagepink)} style={{
                            width: "80%", height: "2%"
                        }}></img></button>
                    )
                })}
            </div>
        </center>
    )
}

export default Screen