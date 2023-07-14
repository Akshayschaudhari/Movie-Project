import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../config";
import CarouselMovie from "./Home/CarouselMovie";

function Carousel1() {
  const [listings, setListings] = useState([]);
  const [flag, setflag] = useState(false);

  let renderInc = 0;
  let carourselCount = 0;
  useEffect(() => {
    caro();
    init_carousel();
  }, [flag]);

  const caro = () => {
    axios
      .get(config.serverURL+"/Theater/getmovie", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
    
        if (result["Status"] === "success") {
          setListings(result["data"]);
          setflag(true);
        } else {
          toast.error(result["error"]);
        }
      }).catch((error) => {
        toast.error(error.response.data.Data)
    });
  };
  const init_carousel = () => {
    let myCarousel = document.querySelector(".carousel-control-next");

    if (myCarousel) myCarousel.click();
  };
  return (
    <div>
      {flag && (
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ position: "relative", top: "1rem" }}
        >
          <div className="carousel-inner">
            {listings.map((movie) => {
              return (
                ++carourselCount <= 5 && //Inc is non zero item
                ((!renderInc++ && (
                  <div
                    className="carousel-item active"
                    data-bs-interval="3000"
                    key={movie.movieId}
                  >
                    <CarouselMovie movie={movie} />
                  </div>
                )) || (
                  <div
                    className="carousel-item"
                    data-bs-interval="2000"
                    key={movie.movieId}
                  >
                    <CarouselMovie movie={movie} />
                  </div>
                ))
              );
            })}

          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </div>
  );
}
export default Carousel1;
