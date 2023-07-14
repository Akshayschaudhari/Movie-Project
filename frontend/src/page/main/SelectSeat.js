import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Screen from "../../components/screen"
import { toast } from "react-toastify"

function SelectSeat(prop) {

    const nav = useNavigate()
    let i=1
    const TCount = useSelector((state) => state.SeatSelection.totalSeat)
    const SNum = useSelector((state) => state.SeatSelection.seatNumbers)
    const amount = useSelector((state) => state.SeatSelection.totalprice)

    const loc = useLocation()

    if (loc.state === null) {
        return (
            <div className="container" style={{backgroundColor: "#cce8ff", height: "25%", margin : "4rem", padding : "2rem", borderRadius :"1rem"}}>
            <h4 style={{marginLeft: "2rem"}}></h4><center><h2>Invalid Page !!</h2></center>
            </div>
        )
    }
    let { movie, theater, showId, screenName, langauge, format, shtime } = loc.state
    function book() {
        if (sessionStorage.token === undefined) {
            toast.error("Please LogIn to Continue !!!")
        } else {
            nav("/bookticket", { state: { movie, theater, showId, screenName, langauge, format, shtime } })
        }
    }

    return (
        <div className="container-fluid" style={{ backgroundColor: "none", width: "100%", padding: 0 }}>
            <div className="container-fluid" style={{ marginLeft: "0rem", Top: 0, border: "none", height: "auto", padding: "1rem", backgroundColor: "#455A64", marginBottom: "1rem" }}>
                <br></br>
                <h2 className="mb-3" style={{ marginLeft: "10rem", color: "white" }}>{movie.movie_name}</h2>
                <h6 className="mb-3" style={{ marginLeft: "8rem", padding: "2rem", color: "white" }}>{theater.theaterName}, {theater.address}, {theater.city}, {theater.pincode}</h6>
            </div>
            <div className="container" style={{ backgroundColor: "none", width: "100%", justifyContent: "center", display: "flex" }}>
                <div className="overflow-auto" style={{ textAlign: "center", width: "75%", border: "none", borderRadius: 10, }}>
                    <Screen></Screen>
                </div>
                <div className="container" style={{ backgroundColor: "none", width: "25%", marginBottom: 10 }}>
                    <div className="container" style={{ marginTop: 100, backgroundColor: "#cce8ff", width: "100%", border: "solid", borderRadius: 10, boxShadow: '1px 1px 20px 5px #C9C9C9' }}>
                        <b><h4 style={{ textAlign: "center" }}>Ticket Details</h4></b>
                        Total Seat Selected : <p>{TCount}</p>
                        Selected Seat No. : <p>{SNum.map((N) => {
                            return (
                                <span key={i++}> {N},</span>
                            )
                        })}</p>
                        <p>Amount : {amount} Rs.</p>
                        <div className="container" style={{ textAlign: "center", marginBottom: 5 }}>
                            {TCount > 0 && <button className="btn btn-success" onClick={()=>{book()}}>continue booking</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectSeat
