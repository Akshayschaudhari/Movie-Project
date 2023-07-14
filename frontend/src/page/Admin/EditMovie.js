import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const Addmovie = () => {
  const nav = useNavigate();
  const [movies, setMovies] = useState([]);
  const [file, setFile] = useState();
  let srNo = 0;
  let i = 1;

  useEffect(() => {
    const loadMovies = () => {
      axios
        .get(config.serverURL+"/Theater/getmovie", {
          headers: {
            token: sessionStorage.token,
          },
        })
        .then((response) => {
          const result = response.data;
          if (result["Status"] === "success") {
            setMovies(result["data"]);
          } else {
            toast.error(result["error"]);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    };
    loadMovies();
  }, []);

  function protraitUpload(movieName) {
    const imgbody = new FormData();
    imgbody.set("photo", file);

    axios
      .post(config.serverURL+"/admin/addimage/" + movieName, imgbody, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "error") {
          toast.error("User does not exist");
        } else {
          toast.success("Movie successfully added");
          nav("/adminhome");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  function landScapeUpload(movieName) {
    const imgbody = new FormData();
    imgbody.set("photo", file);

    axios
      .post(
        config.serverURL+"/admin/uploadLandScapePoster/" + movieName,
        imgbody,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: sessionStorage.token,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "error") {
          toast.error("User does not exist");
        } else {
          toast.success("Movie successfully added");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  return (
    sessionStorage.role === "Admin" && (
      <div
        className="container-fluid"
        style={{
          paddingTop: 0,
          top: 0,
          marginLeft: 0,
          height: "100%",
          paddingLeft: 0,
          width: "100%",
          display: "flex",
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
          <AdminSidebar></AdminSidebar>
        </div>
        <div
          className="container"
          style={{
            position: "relative",
            top: 10,
            width: "85%",
            marginRight: 0,
          }}
        >
          <h3 style={{ textAlign: "center" }}>Edit Movie</h3>
          <hr />
          <center>
            <table className="table table-striped">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>Sr. No</td>
                  <td>Movie Name</td>
                  <td>Upload Image</td>
                  <td>Protrait Poster</td>
                  <td>LandScape Poster</td>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {movies.map((show) => {
                  return (
                    <tr key={i++}>
                      <td>{++srNo}</td>
                      <td>{show.movie_name}</td>
                      <td>
                        <input
                          onChange={(event) => {
                            setFile(event.target.files[0]);
                          }}
                          className="form-control"
                          type="file"
                        ></input>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            protraitUpload(show.movie_name);
                          }}
                          className="btn btn-success"
                          style={{ marginRight: 20 }}
                        >
                          Protrait
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            landScapeUpload(show.movie_name);
                          }}
                          className="btn btn-success"
                          style={{ marginRight: 20 }}
                        >
                          LandScape
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        </div>
      </div>
    )
  );
};

export default Addmovie;
