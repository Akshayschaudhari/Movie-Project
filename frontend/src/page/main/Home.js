import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Carousel1 from "../../components/carousel";
import ShowSingleMovie from "../../components/Home/showSingleMovie";
import config from "../../config";
import "./Home.css";
import { useDispatch } from "react-redux";
import {
  setGenreSelected,
  setFormatSelected,
  setLanguageSelected,
} from "../../Slice/filterSlice";

const Home = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  let count = 0;
  let i = 1;
  
  const dispatch = useDispatch();
  useEffect(() => {
    loadHomes();
  }, []);

  const loadHomes = () => {
    axios
      .get(config.serverURL + "/Theater/getmovie", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setListings(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  const navigateToShowAll = () => {
    dispatch(setGenreSelected(""));
    dispatch(setFormatSelected(""));
    dispatch(setLanguageSelected(""));
    navigate("/nowshowing");
  };

  return (
    <div className="container">
      <Carousel1></Carousel1>

      <br></br>
      <br></br>
      <div className="row" style={{ marginBottom: "1rem" }}>
        <div className="col" style={{ fontWeight: "bolder", fontSize: 25 }}>
          NOW SHOWING:
        </div>
        <div
          className="col"
          style={{
            textAlign: "end",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="btn btn-warning"
            style={{ marginLeft: 10 }}
            onClick={() => {
              navigateToShowAll();
            }}
          >
            See All
          </button>
        </div>
      </div>

      {/* To filter upto current date and below in recent order */}
      {/* {listings.filter((obj)=>  Date(obj.release_Date)-Date.now()<=0).map((movie) => { */}
      {listings.map((movie) => {
        return ++count <= 8 && <ShowSingleMovie key={i++} movie={movie} />;
      })}
    </div>
  );
};

export default Home;
