import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminSidebar from "./adminSidebar";

const MovieRevenueByDate = () => {
  const [movie, setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [date, setDate] = useState("");
  const [revenueobj, setRevenueobj] = useState(-1);
  let i = 1;

  useEffect(() => {
    loadMovie();
  }, []);

  const loadMovie = () => {
    axios
      .get(config.serverURL+"/admin/movie", {
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
  };

  function GetRevenueMovie() {
    setRevenueobj(-1);
    if (selectedMovie.length === 0 && selectedMovie === "Select Movie") {
      toast.error("Enter Movie");
    } else if (date.length === 0) {
      toast.error("Enter Date");
    } else {
      let Id = 0;
      movie.forEach((mv) => {
        if (mv.movie_name === selectedMovie) {
          Id = mv.movieId;
        }
      });
      axios
        .post(
          config.serverURL+"/admin/movierevenue",
          { Id, date },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result["Status"] === "success") {
            setRevenueobj(result["data"][0].revenue);
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
            Movie Revenue Statistics
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
                      setRevenueobj(-1);
                      setSelectedMovie(event.target.value);
                    }}
                  >
                    <option>Select Movie</option>
                    {movie.map((mv) => {
                      return <option key={i++}>{mv.movie_name}</option>;
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
                      GetRevenueMovie();
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
            {revenueobj !== -1 && (
              <div style={{ marginTop: "2rem" }}>
                <h1>
                  Total Collection of {selectedMovie} is{" "}
                  <b>{revenueobj} Rs/-</b>
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default MovieRevenueByDate;
