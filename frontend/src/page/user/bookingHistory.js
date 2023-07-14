import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";


const BookingHistory = () => {
    const [bookedTicket, setTBookedTicket] = useState([]);

    useEffect(() => {
        loadAdminHome();
    }, []);

    const loadAdminHome = () => {
        axios
            .get(config.serverURL+"/user/getbookedticket", {
                headers: {
                    token: sessionStorage.token,
                },
            })
            .then((response) => {
                const result = response.data;
                if (result["Status"] === "success") {
                    setTBookedTicket(result["data"]);
                } else {
                    toast.error(result["error"]);
                }
            }).catch((error) => {
                toast.error(error.response.data.Data)
            });
    };

    function cancel(bookingId) {
        const body = {
            bookingId
        };

        axios.put(config.serverURL+"/user/cancelticket", body, {
            headers: { token: sessionStorage.token },
        }).then((response) => {
            const result = response.data;
            if (result["Status"] === "success") {
                toast.success("Ticket Cancelled Successsully");
                loadAdminHome()
            } else {
                toast.error("error");
            }
        }).catch((error) => {
            toast.error(error.response.data.Data)
        });
    }

    return (
        sessionStorage.role === "User" && <div className="container-fluid" style={{ paddingTop: 0, top: 0, marginLeft: 0, height: "100%", paddingLeft: 0 }}>
            <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <h3 style={{ textAlign: "center" }}>Booking History</h3>
            </div>

            <div>
                <hr></hr>
                <center>
                    <table className="table table-striped" style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                        <thead>
                            <tr style={{ fontWeight: "bold" }}>
                                <td style={{ textAlign: "center" }}>Movie Name</td>
                                <td style={{ textAlign: "center" }}>Language</td>
                                <td style={{ textAlign: "center" }}>Format</td>
                                <td style={{ textAlign: "center" }}>Seat No.</td>
                                <td style={{ textAlign: "center" }}>Theater Name</td>
                                <td style={{ textAlign: "center" }}>Screen Name</td>
                                <td style={{ textAlign: "center" }}>Address</td>
                                <td style={{ textAlign: "center" }}>Show Date</td>
                                <td style={{ textAlign: "center" }}>Show Time</td>
                                <td style={{ textAlign: "center" }}>Total Price</td>
                                <td style={{ textAlign: "center" }}>Cancel Ticket</td>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {bookedTicket.map((Ticket) => {
                                return (
                                    <tr key={Ticket.bookingId}>
                                        <td style={{ textAlign: "center" }}>{Ticket.movie_name}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.language}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.format}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.seatNo}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.theaterName}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.screenName}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.address}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.show_date}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.show_start_Time}</td>
                                        <td style={{ textAlign: "center" }}>{Ticket.totalPrice}</td>
                                        <td style={{ textAlign: "center" }}>{
                                            Ticket.cancel === 0 && <button className="btn btn-danger" onClick={() => {
                                                cancel(Ticket.bookingId)
                                            }}>
                                                Cancel
                                            </button>
                                        }
                                            {Ticket.booking_status === 1 && <p>Cancelled</p>}
                                            {Ticket.booking_status !== 1 && Ticket.cancel !== 0 && <p>Success</p>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </center>
            </div>
        </div>
    );
};
export default BookingHistory;