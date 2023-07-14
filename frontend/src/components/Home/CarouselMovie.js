import { useNavigate } from "react-router-dom";
import config from "../../config";

function CarouselMovie(props) {
    const navigate = useNavigate();

  return (
    <img
      src={config.serverURL+`/${props.movie.imageLandscape}`}
      style={{ height: 500, width: 600, cursor: "pointer" }}
      onClick={() => {
        navigate("/showmovie", { state: { movie: props.movie } });
      }}
      className="d-block w-100"
      alt={props.movie.movie_name}
    />
  );
}

export default CarouselMovie;
