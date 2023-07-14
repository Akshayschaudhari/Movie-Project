import axios from "axios";
import { toast } from "react-toastify"
import config from "../config";

function CancelTicket(prop){
    let bookingId = prop.bookingId
    function cancel(){
        const body = {
            bookingId
        };

        axios.put(config.serverURL+"/user/cancelticket", body, {
            headers: { token: sessionStorage.token },
        }).then((response) => {
            const result = response.data;
         
            if (result["Status"] === "success") {
                toast.success("Ticket Cancelled Successsully");
             } else {
               toast.error("error");
             }
        }).catch((error) => {
            toast.error(error.response.data.Data)
        });
    }

    return (
        <button className="btn btn-danger" onClick={()=>{
            cancel()
        }}>
            Cancel
        </button>
    )
}

export default CancelTicket