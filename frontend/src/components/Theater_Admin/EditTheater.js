import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function EditTheater(props) {
  const navigate = useNavigate();
  const theaterObject = props.theaterObj;

  const [TheaterName, setTheaterName] = useState("");
  const [Address, setAddress] = useState("");

  const theaterId = theaterObject[0].theaterId;

  function submit() {
    if (TheaterName.length === 0) {
      toast.error("Enter Theater name");
    } else if (Address.length === 0) {
      toast.error("Enter Address");
    } else {
      axios
        .put(
          config.serverURL+"/Theater/updateTheater",
          {
            theaterId,
            TheaterName,
            Address,
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
            toast.error("Theater not Added");
          } else {
            toast.success("Theater Details Edited");
            navigate("/theateradmin");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }

  return (
    <div className="container" style={{ top: 0, width: "85%", marginRight: 0 }}>
      <h3 style={{ textAlign: "center", marginTop: 30 }}>Edit Theater</h3>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <div className="form">
            <div className="mb-3">
              <label>Theater Name</label>
              <input
                onChange={(event) => {
                  setTheaterName(event.target.value);
                }}
                className="form-control"
                type="text"
                placeholder={theaterObject[0].theaterName}
              ></input>
            </div>
            <div className="mb-3">
              <label>Address</label>
              <input
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                className="form-control"
                type="text"
                placeholder={theaterObject[0].address}
              ></input>
            </div>
            <div className="mb-3">
              <label>City</label>
              <input
                className="form-control"
                type="text"
                placeholder={theaterObject[0].city}
                readOnly="readonly"
              ></input>
            </div>
            <div className="mb-3">
              <label>Pincode</label>
              <input
                className="form-control"
                placeholder={theaterObject[0].pincode}
                type="number"
                readOnly="readonly"
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
  );
}

export default EditTheater;
