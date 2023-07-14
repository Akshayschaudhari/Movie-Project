import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import TheaterAdminSidebar from "./sidebar";

const TheaterRevenueTh = () => {
  const [date, setDate] = useState("");
  const [revenueobj, setRevenueobj] = useState([]);
  let i = 1;

  function GetRevenue() {
    if (date.length === 0) {
      toast.error("Enter Date");
    } else {
      axios
        .post(
          config.serverURL+"/admin/revenuetheater",
          {
            date,
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
          <h3 style={{ textAlign: "center", marginTop: 30, zIndex: 1 }}>
            Theater Revenue Statistics
          </h3>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="form">
                <div className="mb-3">
                  <label>Select Date :</label>
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
            <h3 style={{ marginLeft: 0 }}>Date : {date}</h3>
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
export default TheaterRevenueTh;
