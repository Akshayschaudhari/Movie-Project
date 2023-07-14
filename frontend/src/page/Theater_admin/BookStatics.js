import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify";
import config from "../../config";
import TheaterAdminSidebar from "./sidebar";
const Book = () => {
  const [screenno, setScreenno] = useState("");
  let i=1;
  const [date, setdate] = useState("");
  const [bookstat, setBookStat] = useState([]);
  const loc = useLocation()
  const { result1 } = loc.state

  function submit() {
    if (screenno.length === 0) {
      toast.error("Enter Screen no");
    } else if (date.length === 0) {
      toast.error("Enter date");
    } else {
      axios
        .post(
          config.serverURL+"/Theater/bookstats",
          { screenno, date },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((responce) => {
          const result = responce.data;
          if (result["Status"] === "error") {
            toast.error("Error");
          } else {
            
            if(result.data.length===0){
              toast.error("No Booking")
            }else{
              toast.success("Display Booking Stats");
              setBookStat(result.data);
            }
            
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }
  return (
    sessionStorage.role === "Theater_Admin" && <div className="container-fluid" style={{ paddingTop: 0, top: 0, marginLeft: 0, height: "100%", paddingLeft: 0, width: "100%", display: "flex" }}>
            <div className="container" style={{ backgroundColor: "black", top: 0, width: "15%", margin: 0, height: "100%", paddingLeft: 0 }}>
                <TheaterAdminSidebar></TheaterAdminSidebar>
            </div>
            <div className="container" style={{ top: 0, width: "85%", marginRight: 0 }}>
    <div>
      <h3 style={{ textAlign: "center", marginTop: 30 }}>Booking Status</h3>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="form">
            <div className="mb-3">
              <label style={{marginRight:"50px"}}>Screen No.</label>
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
                  setScreenno(event.target.value);
                }}
              >
                
                <option>Select</option>
                {result1.map((a) => {
                  return <option key={i++}>{a}</option>;
                })}
              </select>
            </div>
            <div className="mb-3">
              <label>Enter Date</label>
              <input
                onChange={(event) => {
                  setdate(event.target.value);
                }}
                className="form-control"
                type="date"
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
        <div>
          {bookstat.length !== 0 && (
            <div className="container">
              <center>
                <table className="table table-striped">
                  <thead>
                    <tr style={{ fontWeight: "bold" }}>
                    <td>Screen no</td>
                      <td>Movie Name</td>
                      <td>Show Start time</td>
                      <td>Show ID</td>
                      <td>Seat Book</td>
                      <td>Total Seats</td>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                  {bookstat.map((bookseat) => {
                    return (
                      <tr key={i++}>
                        <td>{screenno}</td>
                        <td>{bookseat.movie_name}</td>
                        <td>{bookseat.show_start_Time}</td>
                        <td>{bookseat.showId}</td>
                        <td>{bookseat.book}</td>
                        <td>{bookseat.Total_Seat}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default Book;
