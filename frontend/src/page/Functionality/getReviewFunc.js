import axios from "axios";
import config from "../../config";

let getReviewFunc = (getMovieId, movie, navigate) => {
  let result = [];

  axios
    .get(config.serverURL+"/user/getreview=" + getMovieId, {
      headers: {
        tokens: sessionStorage.token,
      },
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.Data);
    });
};

export default getReviewFunc;
