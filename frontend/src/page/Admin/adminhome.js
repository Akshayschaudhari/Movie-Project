import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import config from "../../config";
import AdminSidebar from "./adminSidebar";

const correctIcon = require("../../Icons/Correct-icon-button-on-transparent-background-PNG.png");
const wrongIcon = require("../../Icons/Cancel-512.png");

const Adminhome = () => {
  const [unauthor, setUnAuthor] = useState([]);
  const [theaterAdiminUsers, setTheaterAdminUsers] = useState([]);
  let i = 1;

  useEffect(() => {
    loadAdminHome();
  }, []);

  const loadAdminHome = () => {
    //getting unauth object
    axios
      .get(config.serverURL+"/admin/unauthorize", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setUnAuthor(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });

    //getting auth object
    axios
      .get(config.serverURL+"/admin/authorize", {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setTheaterAdminUsers(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  };

  function Authorise(userId) {
    axios
      .put(
        config.serverURL+"/admin/authorize",
        {
          userId,
        },
        {
          headers: {
            token: sessionStorage.token,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          toast.success("Successfully Authorised");
          loadAdminHome();
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  function UnAuthoriseAdmin(userId) {
    axios
      .put(
        config.serverURL+"/admin/unauthorize",
        {
          userId,
        },
        {
          headers: {
            token: sessionStorage.token,
          },
        }
      )
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          toast.success("Successfully UnAuthorised");
          loadAdminHome();
        } else {
          toast.error(result["error"]);
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
          {/* TO BE Authorised */}
          <div className="container">
            <h3>Theater Admin: To be Authorised</h3>
            <hr />
            <center>
              <table className="table table-striped">
                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Mobile No.</td>
                    <td>Email</td>
                    <td>Status</td>
                    <td style={{ textAlign: "center" }}>Authorise</td>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {(unauthor.length === 0 && (
                    <tr>
                      <td colSpan={6} style={{ textAlign: "center" }}>
                        No Theater Admin to be authorize
                      </td>
                    </tr>
                  )) ||
                    unauthor.map((author) => {
                      return (
                        <tr key={i++}>
                          <td>{author.first_name}</td>
                          <td>{author.last_name}</td>
                          <td>{author.mobile_no}</td>
                          <td>{author.email}</td>
                          <td style={{ fontWeight: "bold", color: "red" }}>
                            Not Authorise
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              // className="btn btn-success"
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              onClick={() => {
                                Authorise(author.userId);
                              }}
                            >
                              <img
                                style={{
                                  backgroundColor: "none",
                                  height: 30,
                                  width: 30,
                                }}
                                src={correctIcon}
                                alt="Auth Icon"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </center>
          </div>

          {/* Authorized admin */}
          <div className="container" style={{ marginTop: 50 }}>
            <h3>Theater Admin: Authorised</h3>
            <hr />
            <center>
              <table className="table table-striped">
                <thead>
                  <tr style={{ fontWeight: "bold" }}>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Mobile No.</td>
                    <td>Email</td>
                    <td>Status</td>
                    <td style={{ textAlign: "center" }}>Un-Authorise</td>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {theaterAdiminUsers.map((theaterAdmin) => {
                    return (
                      <tr key={i++}>
                        <td>{theaterAdmin.first_name}</td>
                        <td>{theaterAdmin.last_name}</td>
                        <td>{theaterAdmin.mobile_no}</td>
                        <td>{theaterAdmin.email}</td>
                        <td style={{ fontWeight: "bold", color: "green" }}>
                          Authorised
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-danger"
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              UnAuthoriseAdmin(theaterAdmin.userId);
                            }}
                          >
                            <img
                              style={{
                                backgroundColor: "none",
                                height: 30,
                                width: 30,
                              }}
                              src={wrongIcon}
                              alt="UnAuth Icon"
                            />
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
      </div>
    )
  );
};

export default Adminhome;
