import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { storeabc } from "../Slice/seatNumberSelecction";
import { useSelector } from "react-redux";
import config from "../config";
function Gotoshow(props) {
  const nav = useNavigate();
  let City = useSelector((state) => state.SeatSelection.city)
  const dispatch = useDispatch();
  let today = new Date();
 
  const [langauge, setlanguage] = useState("");
  const [format, setFormat] = useState("");
  const movie = props.movieObj;

  const lang = movie.language.split(",");
  const formt = movie.format.split(",");

  let passlang = [];
  let passformt = [];

  function getshow(langauge, format) {
    if (langauge.length === 0 || langauge === "Select") {
      toast.error("please select language");
    } else if (format.length === 0 || format === "Select") {
      toast.error("please select Format");
    } else if (City==="Select" || City.length===0 ) {
      toast.error("please select location");
    }else {
      const body = {
        city: City,
        today: today.toISOString().slice(0, 10),
        MovieId: movie.movieId,
        langauge: langauge,
        format: format,
      };

      axios
        .post(config.serverURL+"/Theater/getshow", body, {
          headers: {
            token: sessionStorage.token,
          },
        })
        .then((responce) => {
          const result1 = responce.data;
          
          dispatch(storeabc({ r: result1, a: 1 }));

          passlang = lang.filter((a) => {
            if (a !== langauge) {
              return a;
            }
          });
          passlang.unshift(langauge);

          passformt = formt.filter((a) => {
            if (a !== format) {
              return a;
            }
          });
          
          passformt.unshift(format);
          nav("/show", { state: { movie, formt: passformt, lang: passlang } });
        }).catch((error) => {
          toast.error(error.response.data.Data)
      });
    }
  }

  const youtubeTrailerLink = () => {

    window.open(`${movie.trailer}`);
  };
  return (
    <div className="container" style={{ paddingLeft: 0 }}>
      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Book Ticket
      </button>
      <button
        className="btn btn-success"
        style={{ marginLeft: 10 }}
        onClick={()=>{youtubeTrailerLink()}}
      >
        Play Trailer
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{backgroundColor:"rgb(255 211 80)"}}>
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLongTitle" style={{color: "black", fontWeight: 600}}>
                Select Language and Format
              </h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-4">
                  <h5 style={{color: "black", fontWeight: 600}}>Language : </h5>
                </div>
                <div className="col-4">
                  <select
                    className="btn btn-secondary"
                    style={{
                      margin: 5,
                      background: "#965E00",
                      alignItems: "center",
                      borderTop: "none",
                      borderBottom: "none",
                      borderColor: "white",
                      borderRadius: 0,
                    }}
                    onChange={(event) => {
                      setlanguage(event.target.value);
                    }}
                  >
                    <option>Select</option>
                    {lang.map((a) => {
                      return <option key={a}>{a}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <h5 style={{color: "black", fontWeight: 600}}>Format : </h5>
                </div>
                <div className="col-4">
                  <select
                    className="btn btn-secondary"
                    style={{
                      margin: 5,
                      background: "#965E00",
                      alignItems: "center",
                      borderTop: "none",
                      borderBottom: "none",
                      borderColor: "white",
                      borderRadius: 0,
                      paddingRight: 5,
                    }}
                    onChange={(event) => {
                      setFormat(event.target.value);
                    }}
                  >
                    <option>Select</option>
                    {formt.map((a) => {
                      return <option key={a}>{a}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  getshow(langauge, format);
                }}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Continue Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gotoshow;

