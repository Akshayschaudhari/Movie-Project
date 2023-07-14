import "./RenderMovie.css";
import { useNavigate } from "react-router";
import ShowSingleMovie from "../Home/showSingleMovie";


//Requirement MovieId and Movie Object
function RenderMovie(props) {
  const navigate = useNavigate();
  let gotMovies = [];
  let count = 0;
  gotMovies = props.movieObject;
  const movieId = props.movieId;
  let i=1;

  return (
    <section className="wrapper" style={{ marginTop: 20, margin: "auto" }}>
      {gotMovies.map((movie) => {
        return (
          movie.movieId !== movieId &&
          ++count <= 4 && <ShowSingleMovie key={i++} movie={movie} />
        );
      })}
    </section>
  );
}

export default RenderMovie;
