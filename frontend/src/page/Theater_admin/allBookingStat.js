import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";
import TheaterAdminSidebar from "./sidebar";
const AllBookStat = () => {
  const [screenno, setScreenno] = useState("");
  const [bookstat, setBookStat] = useState([]);
  const [show, setShow] = useState([]);
  const [showname, setShowName] = useState();
  const loc = useLocation();
  const { result1 } = loc.state;

  let i=1;

  function submit() {
    let showId = 0;
    show.forEach((a) => {
      if (a.show_start_Time === showname) {
        showId = a.showId;
      }
    });
    if (screenno.length === 0) {
      toast.error("Enter Screen no");
    }
    else if (showId < 0) {
      toast.error("Select Show Time");
    } else if (showname.length === 0 || showname==="Select") {
      toast.error("Select Show Time");
    } else {
      axios
        .post(config.serverURL+"/Theater/allbookstats", 
        { showId },
        {
          headers: {
            token: sessionStorage.token,
          },
        })
        .then((responce) => {
          const result = responce.data;
          if (result["Status"] === "error") {
            toast.error("No result");
            setBookStat([])
          } else {
            if (result.data.length === 0) {
              toast.error("No Booking For Given Show");
            } else {
              setBookStat(result.data);
            }
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }

  function getshow(date) {
    if (screenno.length === 0) {
      toast.error("Enter Screen no");
    } else if (date.length === 0) {
      toast.error("Enter date");
    } else {
      axios
        .post(
          config.serverURL+"/Theater/getshows",
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
            toast.error("No Show Available");
            setShow([]);
            setBookStat([])
          } else {
            if (result.data.length === 0) {
              toast.error("No Show Available");
              setShow([]);
              setBookStat([])
            } else {
              setShow(result.data);
            }
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }
  return (
    sessionStorage.role === "Theater_Admin" && (
      <div
        className="container-fluid"
        style={{
          paddingTop: 0,
          top: 0,
          marginLeft: 0,
          height: "100%",
          paddingLeft: 0,
          width: "100%",
          display: "flex",
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: "black",
            top: 0,
            width: "15%",
            margin: 0,
            height: "100%",
            paddingLeft: 0,
          }}
        >
          <TheaterAdminSidebar></TheaterAdminSidebar>
        </div>
        <div
          className="container"
          style={{ top: 0, width: "85%", marginRight: 0 }}
        >
          <div>
            <h3 style={{ textAlign: "center", marginTop: 30 }}>
              Booking Status
            </h3>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <div className="form">
                  <div className="mb-3">
                    <label style={{ marginRight: "50px" }}>Screen No. : </label>
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
                          setBookStat([])
                          setShow([])
                          
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
                        setBookStat([])
                        getshow(event.target.value)
                      }}
                      className="form-control"
                      type="date"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label style={{ marginRight: "50px" }}>Show Time : </label>
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
                        setShowName(event.target.value);
                        setBookStat([])
                      }}
                    >
                      <option>Select</option>
                      {show.map((a) => {
                        return <option key={i++}>{a.show_start_Time}</option>;
                      })}
                    </select>
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
                      <table className="table table-striped" style={{textAlign : "center"}}>
                        <thead>
                          <tr style={{ fontWeight: "bold" }}>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Seat No</td>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {bookstat.map((bookseat) => {
                          return (
                            <tr key={i++}>
                              <td>{bookseat.first_name}</td>
                              <td>{bookseat.last_name}</td>
                              <td>{bookseat.seatNo}</td>
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
    )
  );
};
export default AllBookStat;
