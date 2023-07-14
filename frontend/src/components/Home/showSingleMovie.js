import { useNavigate } from "react-router-dom";
import config from "../../config";

function ShowSingleMovie(props) {
  const navigate = useNavigate();
  const movie = props.movie;

  function navigateToShowMovie() {
    navigate("/showmovie", { state: { movie: movie } });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div
      className="row"
      key={movie.movieId}
      style={{ display: "inline-block", marginRight: 10 }}
    >
      <div className="col-12">
        <div className="card-title" style={{ width: 300, textAlign: "center" }}>
          <button
            onClick={() => {
              navigateToShowMovie();
            }}
            style={{ padding: 0, border: 0 }}
          >
            <img
              src={config.serverURL + `/${movie.image}`}
              className="card-img-top"
              style={{
                height: 350,
                width: 240,
                borderRadius: 10,
                cursor: "pointer",
              }}
              alt="..."
            />
          </button>
          <div className="card-body" style={{ height: "4rem" }}>
            <h4 className="card-title">{movie.movie_name}</h4>
            <h6 className="card-title" style={{ color: "GrayText" }}>
              Geners: {movie.genre}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowSingleMovie;
