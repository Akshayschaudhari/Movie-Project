import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminSidebar from "./adminSidebar";

const TheaterRevenue = () => {
  const [theater, setTheater] = useState([]);
  const [selectedtheater, setSelectedTheater] = useState("");
  const [date, setDate] = useState("");
  const [revenueobj, setRevenueobj] = useState([]);
  let i = 1;

  useEffect(() => {
    loadAdminHome();
  }, []);

  const loadAdminHome = () => {
    axios
      .get(config.serverURL+"/admin/gettheater", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;

        if (result["Status"] === "success") {
          setTheater(result["data"]);
        } 
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  function GetRevenue() {
    if (selectedtheater.length === 0) {
      toast.error("Enter Theater");
    } else if (date.length === 0) {
      toast.error("Enter Date");
    } else {
      let theaterId = 0;
      theater.forEach((th) => {
        if (th.theater === selectedtheater) {
          theaterId = th.theaterId;
        }
      });

      axios
        .post(
          config.serverURL+"/admin/revenuetheater",
          {
            date,
            Id: theaterId,
          },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result["Status"] === "success") {
            
            setRevenueobj(result["data"]);
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }

  return (
    sessionStorage.role === "Admin" && (
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
          <AdminSidebar></AdminSidebar>
        </div>
        <div
          className="container"
          style={{ top: 0, width: "85%", marginRight: 0 }}
        >
          <h3 style={{ textAlign: "center", marginTop: 30, zIndex: 1 }}>
            Theater Revenue Statistics
          </h3>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="form">
                <div className="mb-3">
                  <label>Select Theater Name</label>
                  <br></br>
                  <select
                    style={{ padding: "0.3rem", marginTop: "1rem" }}
                    onChange={(event) => {
                      setSelectedTheater(event.target.value);
                    }}
                  >
                    <option>Select Theater</option>
                    {theater.map((th) => {
                      return <option key={i++}>{th.theater}</option>;
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Select Date</label>
                  <input
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                    className="form-control"
                    type="date"
                    style={{ width: "10rem", marginTop: "1rem" }}
                  ></input>
                </div>
                <div className="mb-3">
                  <button
                    onClick={() => {
                      GetRevenue();
                    }}
                    className="btn btn-success"
                    style={{ marginRight: 20, marginBottom: "2rem" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
          <div style={{ textAlign: "center", marginTop: 30, zIndex: 1 }}>
            {revenueobj.length !== 0 && (
              <table
                className="table table-striped"
                style={{ marginTop: "2rem" }}
              >
                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <td>Screen Name</td>
                    <td>Mivie Name</td>
                    <td>Show Start Time</td>
                    <td>Total revenue</td>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {revenueobj.map((revenue) => {
                    return (
                      <tr key={i++}>
                        <td>{revenue.screenName}</td>
                        <td>{revenue.movie_name}</td>
                        <td>{revenue.show_start_Time}</td>
                        <td>{revenue.revenue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {revenueobj.length === 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h1>No Revenue !!!!</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default TheaterRevenue;
