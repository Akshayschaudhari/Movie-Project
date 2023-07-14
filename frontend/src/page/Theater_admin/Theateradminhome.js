import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ShowScreenDetails from "../../components/Theater_Admin/ShowScreenDetails";
import TheaterAdminSidebar from "./sidebar";
import { settheaterObject } from "../../Slice/getshow";
import config from "../../config";

const TheaterAdminHomePage = () => {
  const dispatch = useDispatch();
  let i = 0;
  const [theaterDetails, setTheaterDetails] = useState([]);
  const [screenDetails, setSreenDetails] = useState([]);

  useEffect(() => {
    loadTheaterDetails();
    loadScreenId();
  }, []);

  const loadScreenId = () => {
    axios
      .get(config.serverURL+"/Theater/getscreenId", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setSreenDetails(result.data);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  const loadTheaterDetails = () => {
    axios
      .get(config.serverURL+"/Theater/getTheater", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setTheaterDetails(result.data);
          dispatch(settheaterObject(result.data));
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  return (
    sessionStorage.role === "Theater_Admin" && (
      <div
        className="container-fluid"
        style={{
          top: 0,
          paddingLeft: 0,
          width: "100%",
          display: "flex",
          height: "100%",
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: "black",
            top: 0,
            width: "15%",
            margin: 0,
            height: "100%",
            paddingLeft: 0,
          }}
        >
          <TheaterAdminSidebar></TheaterAdminSidebar>
        </div>
        <div
          className="container"
          style={{ top: 0, width: "85%", marginRight: 0 }}
        >
          <div>
            {(theaterDetails.length === 0 && (
              <center style={{ position: "relative", top: 100, color: "red" }}>
                <h1>Please add the theater details!!</h1>
              </center>
            )) || (
              <div>
                <h2 style={{ marginBottom: 30, fontWeight: "bold" }}>
                  Theater: {theaterDetails[0].theaterName},{" "}
                  {theaterDetails[0].city}
                </h2>
                {screenDetails.map((screen) => {
                  return <ShowScreenDetails key={i++} screen={screen} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
export default TheaterAdminHomePage;
