import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function AddTheater(props) {
  const navigate = useNavigate();
  
  const [TheaterName, setTheaterName] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Pincode, setpincode] = useState(0);
  
  function submit() {
    if (TheaterName.length === 0) {
      toast.error("Enter Theater name");
    }
    else if (Address.length === 0) {
      toast.error("Enter Address");
    }
    else if (City.length === 0) {
      toast.error("Enter City");
    }
    else if (Pincode === 0) {
      toast.error("Enter City Pincode");
    }
    else {
      axios.post(config.serverURL+"/Theater/addtheater", {
        TheaterName,
        Address,
        City,
        Pincode
      }, {
        headers: {
          token:
            sessionStorage.token,
        }
      }).then((responce) => {
        const result = responce.data;
  
        if (result["Status"] === "error") {
          toast.error("Theater not Added");
        } else {
          toast.success("Theater Details Added");
          navigate("/theateradmin")
        }
      }).catch((error) => {
        toast.error(error.response.data.Data)
      });
    }

  }


  return <div className="container" style={{ top: 0, width: "85%", marginRight: 0 }}>
  <h3 style={{ textAlign: "center", marginTop: 30 }}>Add Theater</h3>
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
          ></input>
        </div>
        <div className="mb-3">
          <label>City</label>
          <input
            onChange={(event) => {
              setCity(event.target.value);
            }}
            className="form-control"
            type="text"
          ></input>
        </div>
        <div className="mb-3">
          <label>Pincode</label>
          <input
            onChange={(event) => {
              setpincode(event.target.value);
            }}
            className="form-control"
            type="number"
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
}

export default AddTheater;
