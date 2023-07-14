import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { reseatAmount, reseattotalseat, reseatNumbersStore } from "../../Slice/seatNumberSelecction"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import config from "../../config"

function Bookticket() {

    const [paymentmode, setpaymentmode] = useState(0)
    //paymentmode=1=online 
    //paymentmode=2=offline 
    const TCount = useSelector((state) => state.SeatSelection.totalSeat)
    const SNum = useSelector((state) => state.SeatSelection.seatNumbers)
    const amount = useSelector((state) => state.SeatSelection.totalprice)
    let seatnum = SNum[0] + SNum.map((a) => {
        if (a !== SNum[0]) { return ` ` + a }
    })
    const nav = useNavigate()
    const dispatch = useDispatch()
    const loc = useLocation()
    const { movie, theater, showId, screenName, langauge, format, shtime } = loc.state
    function Submit() {
        if (paymentmode === 0) {
            toast.error("Please Select Payment Mode")
        } else {
            const body = {
                showId: showId, seatQtyBooked: TCount, totalPrice: amount, seatno: SNum, paymentType: paymentmode
            }
            axios.post(config.serverURL+"/Theater/confirmticket ", body, {
                headers: { token: sessionStorage.token },
            }).then((responce) => {
                const result = responce.data
                if (result.status === true) {
                    let a = `` + result.booked.map((seat) => { return seat })
                    toast.error("Seat " + a + " alredy booked pls select other")
                } else if (result.status === "error") {
                    toast.error("ERROR")
                } else {
                    toast.success("Ticket Booked Successfully")
                    dispatch(reseatNumbersStore())
                    dispatch(reseatAmount())
                    dispatch(reseattotalseat())
                    nav("/home")
                }

            }).catch((error) => {
                toast.error(error.response.data.Data)
            });
        }
    }

    const styles = {
        container: {
            width: "50%",
            height: "auto",
            padding: 20,
            position: 'relative',
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            borderColor: 'black',
            borderRadius: 10,
            broderWidth: 1,
            borderStyle: 'none',
        },
        containers: {
            width: "25rem",
            height: "auto",
            padding: 20,
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            borderColor: 'black',
            borderRadius: 10,
            broderWidth: 1,
            borderStyle: 'none',
        },
        signinButton: {
            position: 'relative',
            width: '100%',
            height: 40,
            color: 'black',
            borderRadius: 5,
            border: 'none',
            marginTop: 10,
            marginBottom: "4rem"
        }
    }
    const imag = config.serverURL+"/" + movie.image
    return (
        <div className="container">
            <div className="row" style={{ marginTop: 40, border: "solid", borderRadius: 20, boxShadow: '1px 1px 20px 5px #C9C9C9' }}>
                <div className="col-4" style={{ border: "none", padding: "5rem" }}>
                    <img src={imag} className="img-fluid" style={{ width: "100%", height: "100%" }} alt="img" />
                </div>
                <div className="col-8" style={{ border: "none" }}>
                    <div className="container" style={{ marginTop: "4rem", width: "80%", border: "none" }}>
                        <h3> <b >{movie.movie_name}</b></h3>
                        <p> <b >Language</b> : {langauge}</p>
                        <p> <b>format</b> : {format}</p>
                        <p> <b>Theater name</b> : {theater.theaterName} <b style={{ marginLeft: "3rem" }}>Screen name</b> : {screenName}</p>
                        <p> <b>Seat No.</b> : {seatnum}</p>
                        <p> <b>Show Time</b> : {shtime}</p>
                        <p> <b>Total Amount</b> : {amount} Rs.</p>
                        <p> <b>Theater Address</b> : {theater.address}, {theater.city}, {theater.pincode}</p>
                        <div className="form-check" style={{ margin: 0 , padding :0}}>
                        <p><b>Select Payment Mode : </b>
                            <select
                          className="btn btn-secondary"
                          style={{
                            margin: 5,
                            background: "#5B8291",
                            alignItems: "center",
                            borderTop: "none",
                            borderBottom: "none",
                            borderColor: "white",
                            borderRadius: 0,
                          }}
                          onChange={(event) => {
                            if(event.target.value === "Online Payment")
                                setpaymentmode(1)
                            else if(event.target.value === "Offline Payment")
                                setpaymentmode(2)
                            else
                                setpaymentmode(0)
                          }}
                        >
                          <option>Select</option>
                          <option>Online Payment</option>
                          <option>Offline Payment</option>
                        </select>
                        </p>
                        </div>
                        <button className="btn btn-warning" style={styles.signinButton} onClick={()=>{Submit()}}>Book Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookticket