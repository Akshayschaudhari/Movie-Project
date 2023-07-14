import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config";
import { useDispatch } from "react-redux";
import {setReviewAddCheckAttribute} from "../../Slice/reviewSlice"

//import getReviewFunc from "../../page/Functionality/getReviewFunc";

function AddReview(props) {
  const dispatch = useDispatch();

  const movieId = props.movieId;
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");

  function submit() {
    dispatch(setReviewAddCheckAttribute())
    if (review.length === 0) {
      toast.error("Review cannot be blank");
    } else {
      axios
        .post(
          config.serverURL + "/user/addreview",
          {
            review,
            userName,
            movieId,
          },
          {
            headers: {
              token: sessionStorage.token,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result["Status"] === "error") {
            toast.error("Review Already Added");
          } else {
            toast.success("Review added");
            
            // window.location.reload();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.Data);
        });
    }
  }

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#AddReviewModal"
        style={{ margin: "10px", marginLeft: "0px", marginTop: "1px" }}
      >
        Add Review
      </button>

      <div
        className="modal fade"
        id="AddReviewModal"
        tabIndex="-1"
        aria-labelledby="ModalFormLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{ backgroundColor: "rgb(255 211 80)" }}
          >
            <div className="modal-body">
              <button
                type="button"
                className="btn-close btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="myform">
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-6">
                    <div className="form">
                      <div className="mb-3">
                        <label style={{ color: "black", fontWeight: 600 }}>
                          Name
                        </label>
                        <input
                          onChange={(event) => {
                            setUserName(event.target.value);
                          }}
                          className="form-control"
                          type="text"
                          placeholder="anonymous"
                        ></input>
                      </div>

                      <div className="mb-3">
                        <label style={{ color: "black", fontWeight: 600 }}>
                          Review
                        </label>
                        <input
                          onChange={(event) => {
                            setReview(event.target.value);
                          }}
                          className="form-control"
                          type="text"
                          placeholder="Write here (160 words)"
                        ></input>
                      </div>

                      <div className="mb-3">
                        <center>
                          <button
                            onClick={() => {
                              submit();
                            }}
                            type="button"
                            // className="btn-close btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            className="btn btn-success"
                            style={{ marginRight: 20 }}
                          >
                            Add Review
                          </button>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
