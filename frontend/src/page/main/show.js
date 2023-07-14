import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  storeabc,
  reseatNumbersStore,
  reseatAmount,
  reseattotalseat,
} from "../../Slice/seatNumberSelecction";
import config from "../../config";

function Show() {
  let result = useSelector((state) => state.SeatSelection.theaterObject);
  let City = useSelector((state) => state.SeatSelection.city);
  const showdate = [];
  const dispatch = useDispatch();
  const loc = useLocation();
  const nav = useNavigate();
  let shtime = "";
  let i = 1;

  const { movie, formt, lang } = loc.state;
  const [langauge, setlanguage] = useState(lang[0]);
  const [format, setFormat] = useState(formt[0]);

  let today = new Date();
  const [DaySelected, setDayselected] = useState(
    today.toISOString().slice(0, 10)
  );
  const [dateselected, setDateselected] = useState(today.getDate());
  const [monthselected, setMonthselected] = useState(
    today.toLocaleString("en-us", { month: "short" })
  );

  //const month = today.toLocaleString("en-us", { month: "short" });
  //const day = today.getDate();
  showdate.push({
    month: today.toLocaleString("en-us", { month: "short" }),
    date: today.getDate(),
    today: today.toISOString().slice(0, 10),
  });
  for (let i = 0; i < 5; i++) {
    today.setDate(today.getDate() + 1);
    showdate.push({
      month: today.toLocaleString("en-us", { month: "short" }),
      date: today.getDate(),
      today: today.toISOString().slice(0, 10),
    });
  }

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  function getshow(today, langauge, format) {
    const body = {
      city: City,
      today,
      MovieId: movie.movieId,
      langauge: langauge,
      format: format,
    };

    axios
      .post(config.serverURL+"/Theater/getshow", body, {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((responce) => {
        const result1 = responce.data;
        dispatch(storeabc({ r: result1, a: 1 }));
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  function getseatobject(showId) {
    axios
      .get(config.serverURL+"/Theater/getseatobj/" + showId, {
        headers: { token: sessionStorage.token },
      })
      .then((responce) => {
        const result = responce.data;
        dispatch(storeabc({ result, a: 0 }));
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  return (
    <div
      className="container-fluid"
      style={{ marginTop: 0, border: "none", padding: 0, borderRadius: 10 }}
    >
      <div
        className="container-fluid"
        style={{
          Top: 0,
          border: "none",
          height: "6rem",
          padding: "1rem",
          backgroundColor: "#455A64",
        }}
      >
        <br></br>
        <h2
          className="mb-3"
          style={{ marginLeft: "10rem", padding: 0, color: "white" }}
        >
          {movie.movie_name}
        </h2>
      </div>

      <div
        className="container-fluid"
        style={{
          marginTop: "0rem",
          border: "none",
          padding: 0,
          backgroundColor: "#5B8291",
        }}
      >
        <div
          className="container-fluid"
          style={{ marginLeft: "10rem", padding: 1, display: "flex" }}
        >
          {showdate.map((a) => {
            return (
              <button
                key={a.date}
                onClick={() => {
                  getshow(a.today, langauge, format);
                  setDateselected(a.date);
                  setMonthselected(a.month);
                  setDayselected(a.today);
                }}
                className="btn btn-outline-dark"
                style={{
                  margin: 5,
                  color: "white",
                  alignItems: "center",
                  border: "none",
                }}
              >
                {a.month} {a.date}
              </button>
            );
          })}
          <div className="dropdown" style={{ padding: 0, marginLeft: "20%" }}>
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
                setlanguage(event.target.value);
                getshow(DaySelected, event.target.value, format);
              }}
            >
              {lang.map((a) => {
                return <option key={a}>{a}</option>;
              })}
            </select>
          </div>
          <div className="dropdown" style={{ padding: 0, marginLeft: "1rem" }}>
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
                paddingRight: 5,
              }}
              onChange={(event) => {
                setFormat(event.target.value);
                getshow(DaySelected, langauge, event.target.value);
              }}
            >
              {formt.map((a) => {
                return <option key={a}>{a}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: "1rem",
          paddingBottom: "1rem",
          paddingTop: "1rem",
          paddingRight: "0rem",
          paddingLeft: "0rem",
          backgroundColor: "#D9EFF7",
          borderRadius: 10,
          boxShadow: "1px 1px 20px 5px #C9C9C9",
        }}
      >
        <h4 style={{ marginLeft: "2rem" }}>
          <b>
            Show Date : {monthselected} {dateselected}
          </b>
        </h4>
        <h4 style={{ marginLeft: "2rem" }}>
          <b>City : {City}</b>
        </h4>
        {result.length !== 0 &&
          result.map((a) => {
            return (
              <div
                className="container"
                style={{
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  height: "6rem",
                  border: "none",
                  padding: 0,
                }}
                key={i++}
              >
                <div
                  className="row justify-content-md-center"
                  style={{ border: "none", padding: 0, margin: 0 }}
                >
                  <div
                    className="col col-lg-3"
                    style={{
                      border: "none",
                      padding: "1rem",
                      textAlign: "center",
                      backgroundColor: "#CFD8DC",
                    }}
                  >
                    <h5 style={{}}> {a.theaterName}</h5>
                    <p>
                      {a.address}, {a.city}, {a.pincode}
                    </p>
                  </div>
                  <div
                    className="col col-lg-9"
                    style={{
                      border: "none",
                      padding: "2rem",
                      backgroundColor: "#ECEFF1",
                    }}
                  >
                    {a.Show.map((b) => {
                      let showId = b.showId;
                      shtime = tConvert(b.show_start_Time.substring(0, 5));
                      return (
                        <button
                          key={b.showId}
                          onClick={() => {
                            let screenName = a.Screen.map((sc) => {
                              if (b.screenId === sc.screenId) {
                                return sc.screenName;
                              }
                            });
                            getseatobject(showId);
                            dispatch(reseatNumbersStore());
                            dispatch(reseatAmount());
                            dispatch(reseattotalseat());
                            nav("/selectseat", {
                              state: {
                                movie,
                                theater: a,
                                showId: showId,
                                screenName,
                                langauge,
                                format,
                                shtime,
                              },
                            });
                          }}
                          className="btn btn-outline-success"
                          style={{
                            marginLeft: "2rem",
                            alignItems: "center",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          }}
                        >
                          {tConvert(b.show_start_Time.substring(0, 5))}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        {result.length === 0 && (
          <center>
            <h2>No Show Available !!</h2>
          </center>
        )}
      </div>
    </div>
  );
}

export default Show;
