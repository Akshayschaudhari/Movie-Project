import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import TheaterAdminSidebar from "./sidebar";
import { useEffect } from "react";
import { setMovieDetails } from "../../Slice/getshow";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const AddShow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [movie, setMovie] = useState([]);
  const [screen, setScreen] = useState([]);
  const [screenName, setScreenName] = useState("");
  const [show_start_Time, setShow_start_Time] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [silver_seat_price, setSilverSeatPrice] = useState(0);
  const [golden_seat_price, SetGoldenSeatPrice] = useState(0);
  const [show_end_Time, setShowEndTime] = useState("");
  const [language, setLanguage] = useState("");
  const [format, setFormat] = useState("");
  const [show_date, setShow_date] = useState("");
  let i = 1;

  // get the reference of global store count
  //let Flag = useSelector((state) => state.SeatSelection.role);

  const languageObj = useSelector((state) =>
    state.Theaterobject.language.split(",")
  );
  const formatObj = useSelector((state) =>
    state.Theaterobject.format.split(",")
  );

  const durationObj = useSelector((state) => state.Theaterobject.duration);
  const releaseDate = useSelector((state) => state.Theaterobject.releaseDate);

  useEffect(() => {
    loadMovie();
  }, []);

  const loadMovie = () => {
    axios
      .get(config.serverURL + "/admin/movie", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setMovie(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
    axios
      .get(config.serverURL + "/Theater/getscreenId", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setScreen(result.data);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  function submit() {
    let newDate = new Date();
    if (selectedMovie.length === 0 && selectedMovie === "Select Movie") {
      toast.error("Enter Movie");
    } else if (silver_seat_price === 0) {
      toast.error("Enter silver_seat_price");
    } else if (show_start_Time.length === 0) {
      toast.error("Enter show_start_Time");
    } else if (golden_seat_price === 0) {
      toast.error("Enter golden_seat_price");
    } else if (show_end_Time.length === 0) {
      toast.error("Enter show_end_Time");
    } else if (language.length === 0) {
      toast.error("Enter language");
    } else if (format.length === 0) {
      toast.error("Enter format");
    } else if (screenName.length === 0) {
      toast.error("Enter screenName");
    } else if (show_date === 0) {
      toast.error("Enter Show Date");
    }else if (show_date<releaseDate) {
      toast.error("Select date after release date");
    } else if (new Date(show_date) <= newDate) {
      toast.error("Select date after today's date");
    } else if (show_date.length === 0) {
      toast.error("Enter Show Date");
    } else {
      let MovieId = 0;
      let screenId = 0;
      movie.forEach((mv) => {
        if (mv.movie_name === selectedMovie) {
          MovieId = mv.movieId;
        }
      });
      screen.forEach((mv) => {
        if (mv.screenName === screenName) {
          screenId = mv.screenId;
        }
      });
      axios
        .post(
          config.serverURL + "/Theater/addshow",
          {
            MovieId,
            show_start_Time,
            show_date,
            screenId,
            silver_seat_price,
            golden_seat_price,
            show_end_Time,
            language,
            format,
          },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((responce) => {
          const result = responce.data;
          if (result["Status"] === "error") {
            toast.error("Theater Show not Added");
          } else {
            setShow_start_Time("");
            SetGoldenSeatPrice(0);
            setSilverSeatPrice(0);
            setShowEndTime("");
            setLanguage("");
            setFormat("");
            setShow_date("");
            setSelectedMovie("");
            setScreenName("");
            toast.success("Theater Show Added");
            navigate("/theateradmin");
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
            Add Show
          </h3>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="form">
                <div className="mb-3">
                  <label>Select movie Name</label>
                  <br></br>
                  <select
                    style={{ padding: "0.3rem", marginTop: "1rem" }}
                    onChange={(event) => {
                      setSelectedMovie(event.target.value);
                      movie.map((mv) => {
                        if (event.target.value === mv.movie_name) {
                          dispatch(setMovieDetails(mv));
                        }
                      });
                    }}
                  >
                    <option>Select Movie</option>
                    {movie.map((mv) => {
                      return <option key={i++}>{mv.movie_name}</option>;
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Select Screen</label>
                  <br />
                  <select
                    style={{ padding: "0.3rem", marginTop: "1rem" }}
                    onChange={(event) => {
                      setScreenName(event.target.value);
                    }}
                  >
                    <option>Select Screen</option>
                    {screen.map((mv) => {
                      return (
                        <option key={mv.screenName}>{mv.screenName}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Langauge</label>
                  <br />
                  <select
                    style={{ padding: "0.3rem", marginTop: "1rem" }}
                    onChange={(event) => {
                      setLanguage(event.target.value);
                    }}
                  >
                    <option>Select Language</option>
                    {languageObj.map((lang) => {
                      return <option key={i++}>{lang}</option>;
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Format</label>
                  <br />
                  <select
                    style={{ padding: "0.3rem", marginTop: "1rem" }}
                    onChange={(event) => {
                      setFormat(event.target.value);
                    }}
                  >
                    <option>Select Format</option>
                    {formatObj.map((obj) => {
                      return <option key={obj}>{obj}</option>;
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Silver Seat Price</label>
                  <input
                    onChange={(event) => {
                      setSilverSeatPrice(event.target.value);
                    }}
                    className="form-control"
                    type="number"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Golden Seat Price</label>
                  <input
                    onChange={(event) => {
                      SetGoldenSeatPrice(event.target.value);
                    }}
                    className="form-control"
                    type="number"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Show Date</label>
                  <input
                    onChange={(event) => {
                      setShow_date(event.target.value);
                    }}
                    style={{ width: "10rem" }}
                    className="form-control"
                    type="date"
                  ></input>
                  {selectedMovie.length != 0 && (
                <span style={{ fontWeight: "bold" }}>
                  Note: Release Date {releaseDate}
                </span>
              )}
                </div>

                <div className="mb-3">
                  <label style={{ marginRight: "2rem" }}>
                    Show Start Time :{" "}
                  </label>
                  <input
                    onChange={(event) => {
                      setShow_start_Time(event.target.value);
                    }}
                    type="time"
                  ></input>
                  <label style={{ marginRight: "2rem", marginLeft: "2rem" }}>
                    Show End Time :{" "}
                  </label>
                  <input
                    onChange={(event) => {
                      setShowEndTime(event.target.value);
                    }}
                    type="time"
                  ></input>
                </div>
                <div className="mb-3"></div>
              </div>
              {selectedMovie.length != 0 && (
                <p style={{ fontWeight: "bold" }}>
                  Note: movie duration {durationObj}
                </p>
              )}
              <div className="mb-3" style={{ textAlign: "center" }}>
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
    )
  );
};

export default AddShow;
