import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminSidebar from "./adminSidebar";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const Addmovie = () => {
  const [movie_name, setName] = useState("");
  const [Description, setdescription] = useState("");
  const [genre, setgeners] = useState("");
  const [language, setlanguage] = useState("");
  const [format, setformat] = useState("");
  const [release_Date, setreleasedate] = useState("");
  const [trailer, settrailer] = useState("");
  const [Duration, setduration] = useState("");
  const [file, setfile] = useState();
  const [fileLandScapeImage, setFileLandScapeImage]=useState();

  const nav = useNavigate()
  function submit() {
    if (movie_name.length === 0) {
      toast.error("Enter movie name");
    } else if (Description.length === 0) {
      toast.error("Enter description");
    } else if (genre.length === 0) {
      toast.error("Enter generes");
    } else if (language.length === 0) {
      toast.error("Enter movie langauge");
    } else if (format.length === 0) {
      toast.error("Enter movie format");
    } else if (release_Date.length === 0) {
      toast.error("Enter release date");
    } else if (trailer.length === 0) {
      toast.error("Enter trailer link");
    } else if (Duration.length === 0) {
      toast.error("Mention Movie Duration");
    } else {
      axios
        .post(
          config.serverURL+"/admin/addmovie",
          {
            movie_name,
            Description,
            genre,
            language,
            format,
            release_Date,
            trailer,
            Duration,
          },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((responce) => {
          const result = responce.data;
          if (result["Status"] === "error") {
            toast.error("User does not exist");
          } else {
            const imgbody = new FormData();

            imgbody.set("photo", file);
            axios
              .post(
                config.serverURL+"/admin/addimage/" + movie_name,
                imgbody,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    token: sessionStorage.token,
                  },
                }
              )
              .then((responce) => {
                const result = responce.data;
                if (result["Status"] === "error") {
                  toast.error("User does not exist");
                } else { 

                    const landScapeImageBody = new FormData();
        
                    landScapeImageBody.set("photo", fileLandScapeImage);
                    axios
                      .post(
                        config.serverURL+"/admin/uploadLandScapePoster/" + movie_name,
                        landScapeImageBody,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            token: sessionStorage.token,
                          },
                        }
                      )
                      .then((responce) => {
                        const result = responce.data;
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
              })
              .catch((error) => {
                toast.error(error.response.data.Data);
              });
          }
        })
        .catch((error) => {
         
          toast.error(error.response.data.Data);
        });
    }
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
          <h3 style={{ textAlign: "center", marginTop: 30 }}>Add Movie</h3>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <div className="form">
                <div className="mb-3">
                  <label>Movie Name</label>
                  <input
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <input
                    onChange={(event) => {
                      setdescription(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Geners</label>
                  <input
                    onChange={(event) => {
                      setgeners(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Langauge</label>
                  <input
                    onChange={(event) => {
                      setlanguage(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Format</label>
                  <input
                    onChange={(event) => {
                      setformat(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Release Date</label>
                  <input
                    onChange={(event) => {
                      setreleasedate(event.target.value);
                    }}
                    className="form-control"
                    type="date"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Protrait Poster</label>
                  <input
                    onChange={(event) => {
                      setfile(event.target.files[0]);
                    }}
                    className="form-control"
                    type="file"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>LandScape Poster</label>
                  <input
                    onChange={(event) => {
                      setFileLandScapeImage(event.target.files[0]);
                    }}
                    className="form-control"
                    type="file"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Trailer</label>
                  <input
                    onChange={(event) => {
                      settrailer(event.target.value);
                    }}
                    className="form-control"
                    type="text"
                  ></input>
                </div>
                <div className="mb-3">
                  <label>Duration</label>
                  <input
                    onChange={(event) => {
                      setduration(event.target.value);
                    }}
                    className="form-control"
                    style={{ width: 100 }}
                    type="time"
                  ></input>
                </div>

                <div className="mb-3">
                  <button
                    onClick={()=>{submit()}}
                    className="btn btn-success"
                    style={{ marginRight: 20 }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Addmovie;
