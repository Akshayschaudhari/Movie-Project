import { useState, useEffect } from "react";
import axios from "axios";
import RenderMovie from "./RenderMovie";
import { toast } from "react-toastify";
import config from "../../config";

function MovieMightLike(props) {
  const [movieObject, setmovieObject] = useState([]);
  const movieId=props.movieId;


  useEffect(() => {
    function moviesArray() {
      axios
        .get(config.serverURL+"/Theater/getmovie",{
          headers: {
            "Content-Type": "multipart/form-data",
            token:
              sessionStorage.token,
          },
        })
        .then((response) => {
          const result = response.data;

          setmovieObject(result.data);
     
        }).catch((error) => {
          toast.error(error.response.data.Data)
      });
    }
    moviesArray();
  }, []);

  return (
      <RenderMovie movieObject={movieObject} movieId={movieId}/>
  );
}

export default MovieMightLike;
