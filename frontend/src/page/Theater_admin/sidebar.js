import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import SignOut from "../../components/signOut";
import config from "../../config";

function TheaterAdminSidebar() {
  const theaterDetails = useSelector((state) => {
    if (state.Theaterobject.theaterObject.length !== 0) {
      return true;
    } else {
      return false;
    }
  });

  const Nav = useNavigate();
  const loadScreenId = (flag) => {
    axios
      .get(config.serverURL+"/Theater/getscreenId", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          let arr = result.data.map((screenId1) => {
            return screenId1.screenName;
          });
          let arr1 = result.data.map((screenId1) => {
            return screenId1.screenId;
          });

          if (flag)
            Nav("/allbookstats", { state: { result1: arr, result2: arr1 } });
          else Nav("/bookstats", { state: { result1: arr, result2: arr1 } });
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  return (
    sessionStorage.role === "Theater_Admin" && (
      <div
        className="container"
        style={{
          backgroundColor: "black",
          paddingTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          height: "100%",
          marginTop: 0,
        }}
      >
        <ul style={{ listStyleType: "none" }}>
          <li
            style={{
              marginTop: "1rem",
              marginBottom: "2rem",
              marginLeft: "0",
              textAlign: "center",
            }}
          >
            <h5 style={{ color: "white" }}>Welcome , </h5>
            <h5 style={{ color: "white" }}>{sessionStorage.username}</h5>
          </li>
        </ul>
        <div
          className="container"
          style={{
            backgroundColor: "black",
            height: "100vh",
            paddingTop: 0,
            marginTop: "5rem",
          }}
        >
          <center>
            <ul style={{ listStyleType: "none" }}>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    Nav("/theateradmin");
                  }}
                >
                  Home
                </button>

                {/* Dynamic Button Add or Edit if theater is added */}
              </li>
              {(theaterDetails && (
                <li style={{ margin: "1rem", marginLeft: "0" }}>
                  <button
                    className="btn btn-success"
                    onClick={(e) => {
                      Nav("/addtheaterdetails");
                    }}
                  >
                    Edit Theater
                  </button>
                </li>
              )) || (
                <li style={{ margin: "1rem", marginLeft: "0" }}>
                  <button
                    className="btn btn-success"
                    onClick={(e) => {
                      Nav("/addtheaterdetails");
                    }}
                  >
                    Add Theater
                  </button>
                </li>
              )}
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={(e) => {
                    Nav("/addtheaterscreen");
                  }}
                >
                  Add Screen
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/addshow");
                  }}
                >
                  Add Show
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/theaterrevenueth");
                  }}
                >
                  Revenue Statistics
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    loadScreenId(false);
                  }}
                >
                  Booking Statistics
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    loadScreenId(true);
                  }}
                >
                  All Booking Statistics
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <SignOut></SignOut>
              </li>
            </ul>
          </center>
        </div>
      </div>
    )
  );
}

export default TheaterAdminSidebar;
