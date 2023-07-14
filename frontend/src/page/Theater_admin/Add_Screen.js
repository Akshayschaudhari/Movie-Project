import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import TheaterAdminSidebar from "./sidebar";

const TheaterScreen = () => {
  const navigate = useNavigate();

  const [ScreenName, setScreenName] = useState("");
  const [silver_seat_qty, setSilverSeat] = useState(0);
  const [golden_seat_qty, SetGoldenSeat] = useState(0);
  const [rowSeatQty, setRowQty] = useState(0);


  function submit() {
    if (ScreenName.length === 0) {
      toast.error("Enter Screen Name");
    }
    else if (silver_seat_qty === 0) {
      toast.error("Enter Silver Seat Qauntity");
    }
    else if (golden_seat_qty === 0) {
      toast.error("Enter Golden Seat Quantity");
    }
    else if (rowSeatQty === 0) {
      toast.error("Enter Row Seat Quantity");
    }
    else {
      axios.post(config.serverURL+"/Theater/addtheaterscreen",
        {
          ScreenName,
          silver_seat_qty,
          golden_seat_qty,
          rowSeatQty
        }, {
        headers: {
          token:
            sessionStorage.token,
        }
      }).then((responce) => {
        const result = responce.data;
        if (result["Status"] === "error") {
          toast.error("Theater Screen not Added");
        } else {
          setRowQty(0)
          setScreenName("")
          setSilverSeat(0)
          SetGoldenSeat(0)
          toast.success("Theater Screen Added");
          navigate("/theateradmin")
        }
      }).catch((error) => {
        toast.error(error.response.data.Data)
      });
    }

  }

  return (
    sessionStorage.role === "Theater_Admin" && <div className="container-fluid" style={{paddingTop : 0,  top: 0, marginLeft : 0,height : "100%" ,paddingLeft : 0 ,width: "100%", display: "flex" }}>
      <div className="container" style={{ backgroundColor: "black" ,top: 0, width: "15%",margin :0, height : "100%",paddingLeft : 0 }}>
          <TheaterAdminSidebar></TheaterAdminSidebar>
      </div>
      <div className="container" style={{ top: 0, width : "85%" , marginRight : 0}}>
        <h3 style={{ textAlign: "center", marginTop: 30, zIndex: 1 }}>Add Screen</h3>
        
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="form">
              <div className="mb-3">
                <label>Screen Name</label>
                <input
                  onChange={(event) => {
                    setScreenName(event.target.value);
                  }}
                  className="form-control"
                  type="text"
                ></input>
              </div>
              <div className="mb-3">
                <label>Silver Seat Qauntity</label>
                <input
                  onChange={(event) => {
                    setSilverSeat(event.target.value);
                  }}
                  className="form-control"
                  type="number"
                ></input>
              </div>
              <div className="mb-3">
                <label>Golden Seat Quantity</label>
                <input
                  onChange={(event) => {
                    SetGoldenSeat(event.target.value);
                  }}
                  className="form-control"
                  type="number"
                ></input>
              </div>
              <div className="mb-3">
                <label>Row Quantity</label>
                <input
                  onChange={(event) => {
                    setRowQty(event.target.value);
                  }}
                  className="form-control"
                  type="number"
                ></input>
              </div>
              <div className="mb-3">
                <button
                  onClick={()=>{submit()}}
                  className="btn btn-success"
                  style={{ marginRight: 20 }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TheaterScreen;
