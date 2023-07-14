import axios from "axios";
import config from "../../config";

const loadingAdminHome = async () => {
  await axios
    .get(config.serverURL+"/admin/unauthorize", {
      headers: {
        token: sessionStorage.token,
      },
    })
    .then((response) => {
      const result = response.data;
      if (result["Status"] === "success") {
        let res = result["data"];
      }
    })
    .catch((error) => {
      toast.error(error.response.data.Data);
    });
};

export default loadingAdminHome;
