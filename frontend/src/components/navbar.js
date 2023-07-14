import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SignOut from "./signOut";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userCity } from "../Slice/seatNumberSelecction";
import config from "../config";


const LogoHori = require("../Icons/mbs_Logo_hori.png");

const Navbar = () => {
  const [cityname, setcityname] = useState([]);
  const dispatch = useDispatch();
  
  let City = useSelector((state) => state.SeatSelection.city);

  let i = 1;
  const [movie, setmovie] = useState("");
  const loadcity = () => {
    axios
      .get(config.serverURL+"/Theater/getcityname")
      .then((responce) => {
        const result = responce.data;
        if (result["Status"] === "success") {
          setcityname(result.data);
        } else {
          toast.error("Error");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  const navigate = useNavigate();

  const home = () => {
    City === "Select" || City.length === 0 ? navigate("/home") : submit();
  };
  function submit() {
    if (City === "Select" || City.length === 0) {
      toast.error("Please Select City");
    } else {
      axios
        .get(config.serverURL+"/Theater/getmoviebycity/" + City)
        .then((responce) => {
          const result = responce.data;
          if (result["Status"] === "success") {
            navigate("/moviebycity", { state: { sortedmovie: result.data } });
          } else {
            toast.error("Error");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }

  const search = () => {
    if (movie.length === 0) {
      toast.error("Enter name to search");
    } else if (City === "Select" || City.length === 0) {
      toast.error("Please Select City first");
    } else {
      axios
        .get(config.serverURL+"/Theater/getmovie/" + movie, {
          headers: {
            token: sessionStorage.token,
          },
        })
        .then((response) => {
          const result = response.data;
          let movie = result.data;
          if (result["Status"] === "success") {
            navigate("/showmovie", { state: { movie: movie } });
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  };

  return (
    sessionStorage.role !== "Theater_Admin" &&
    sessionStorage.role !== "Admin" && (
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#2f0849d4" }}
      >
        <div className="container-fluid">
          <button
            style={{ textDecoration: "none", color: "black" }}
            className="btn btn-link"
          >
            <img
              src={LogoHori}
              alt="Logo"
              style={{ width: "140px", height: "50px", borderRadius: "10px" }}
              onClick={()=>{home()}}
            />
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ scrollbarGutter: "100px" }}
            >
              <li className="nav-item">
                <input
                  style={{ width: "50rem" }}
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(event) => {
                    setmovie(event.target.value);
                  }}
                />
              </li>
              <li className="nav-item">
                <button
                  style={{ marginRight: "10px" }}
                  className="btn btn-warning"
                  type="submit"
                  onClick={() => {
                    search();
                  }}
                >
                  Search
                </button>
              </li>
              <li className="nav-item dropdown">
                <button
                  onClick={() => {
                    loadcity();
                  }}
                  style={{
                    marginRight: "10px",
                    textDecoration: "none",
                    color: "black",
                  }}
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  {City === "Select" || City.length === 0 ? "Location" : City}
                </button>

                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content" style={{backgroundColor:"rgb(255 211 80)"}}>
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="staticBackdropLabel"
                        >Select your Location</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body" style={{alignSelf:"center"}}>
                        City :{" "}
                        <select
                          className="btn btn-secondary"
                          style={{
                            margin: 5,
                            background: "#965E00",
                            alignItems: "center",
                            borderTop: "none",
                            borderBottom: "none",
                            borderColor: "white",
                            borderRadius: 0,
                          }}
                          onChange={(event) => {
                            dispatch(
                              userCity({ userCityValue: event.target.value })
                            );
                          }}
                        >
                          <option>Select</option>
                          {cityname.map((city1) => {
                            return <option key={i++}>{city1.city}</option>;
                         
                          })}
                        </select>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                          onClick={()=>{submit()}}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                {sessionStorage.token === undefined && (
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    {" "}
                    Signin
                  </button>
                )}
              </li>
              <li className="nav-item">
                {sessionStorage.token !== undefined && (
                  <div className="dropdown" style={{}}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ backgroundColor: "#ffc107", color: "black" }}
                    >
                      Welcome, {sessionStorage.username}
                    </button>
                    <ul
                      className="dropdown-menu"
                      style={{ textAlign: "center" }}
                    >
                      <li>
                        <button
                          className="btn btn-info"
                          style={{
                            width: "100%",
                            height: "100%",
                            marginBottom: "0.5rem",
                            background: "#D3E3D2",
                            border: "none",
                          }}
                          onClick={() => {
                            navigate("/bookinghistory");
                          }}
                        >
                          Booking History
                        </button>
                      </li>
                      <li className="nav-item">
                        {sessionStorage.token !== undefined && (
                          <SignOut></SignOut>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
