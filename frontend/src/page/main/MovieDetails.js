import axios from "axios";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ReviewDisplay from "../../components/Reviews/Review";
import MovieMightLike from "../../components/movieyoulike/MovieMightLike";
import AddReview from "../../components/Reviews/AddReview";
import Gotoshow from "../../components/gotoshow";
import config from "../../config";

const Moviedetails = () => {
  const [reviewArray, setReviewArray] = useState([]);

  const reviewUpdatedStatus = useSelector(
    (state) => state.ReviewSlice.reviewStatus
  );

  let movieObj = [];

  let formatObj = [];
  let langObj = [];
  let duration = [];
  const location = useLocation();

  movieObj = location.state.movie;
  let movieId = movieObj.movieId;
  formatObj = movieObj.format;

  duration = movieObj.Duration.split(":");
  langObj = movieObj.language;

  useEffect(() => {
    //Getting review
    function getReviewFunc(getMovieId, reviewUpdatedStatus) {
      let result = [];
      axios
        .get(config.serverURL + "/user/getreview=" + getMovieId, {
          headers: {
            tokens: sessionStorage.token,
          },
        })
        .then((response) => {
          result = response.data;
          setReviewArray(result);
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
    getReviewFunc(movieId);
  }, [movieId, reviewUpdatedStatus]);

  return (
    <div className="container" style={{ position: "relative", top: "1rem" }}>
      {/* Movie Poster & Details Section */}
      <section>
        <div
          className="super-container card bg-green text-white "
          style={{
            position: "inherit",
            backgroundColor: "black",
            width: "100%",
            height: "400px",
            padding: "10px",
            top: "10px",
            paddingBottom: "100px",
            backgroundImage: `linear-gradient(90deg,rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url("${config.serverURL}/${movieObj.imageLandscape}")`,
            backgroundPosition: "right",
          }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              WebkitAlignItems: "center",
            }}
          >
            {/* Movie Poster Div */}
            <div>
              <img
                src={config.serverURL + `/${movieObj.image}`}
                alt="Poster"
                style={{
                  height: 380,
                  width: 350,
                  display: "block",
                  borderRadius: 10,
                }}
              />
            </div>
            {/* Side bars of movie poster */}
            <div
              style={{
                position: "inherit",
                marginBlock: "5px",
                marginLeft: 370,
                top: 0,
              }}
            >
              <p
                style={{
                  color: "orangered",
                  fontFamily: "Roboto",
                  fontSize: 30,
                  WebkitLineClamp: 1,
                  fontWeight: "bold",
                }}
              >{`${movieObj.movie_name}`}</p>

              <section>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ padding: 1 }}>{`${formatObj}`}</div>
                  <span style={{ marginRight: 5 }}>{`,`}</span>
                  <div>{`${langObj}`}</div>
                </div>
              </section>

              {/* Formatting dates & time */}
              <section>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ marginRight: 5 }}>
                    Release Date-{" "}
                    {`${dateFormat(movieObj.release_Date, "dS mmmm")},`}
                  </div>
                  <div>
                    Duration- {`${duration[0]}`} hrs {`${duration[1]}`} min
                  </div>
                </div>
              </section>

              {sessionStorage.token !== undefined && (
                <AddReview movieId={movieObj.movieId} movieObj={movieObj} />
              )}

              {/* Adding book ticket & trailer buttons */}
              <section>
                <div>
                  <Gotoshow movieObj={movieObj}></Gotoshow>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Description Section */}
      <section>
        <div style={{ position: "relative", top: "20px" }}>
          <h5>Movie description:</h5>
          <p>{`${movieObj.Description}`}</p>
        </div>
      </section>

      {/* Movie Review Section */}
      <section>
        <div style={{ position: "relative", top: "20px" }}>
          <h5>Movie Review's:</h5>
          <ReviewDisplay reviewArray={reviewArray} />
        </div>
      </section>

      {/* Movies you might like */}
      <section>
        <div style={{ position: "relative", marginTop: 50 }}>
          <h5>Movie you might like:</h5>
          <MovieMightLike movieId={movieId} />
        </div>
      </section>
    </div>
  );
};

export default Moviedetails;
