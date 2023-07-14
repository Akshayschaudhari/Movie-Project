import axios from "axios";
import {toast} from "react-toastify"
import { useState } from "react";
import loadingAdminHome from "../../page/Functionality/loadingAdmin";
import config from "../../config";

function UnAuthourizeDisplay(props) {
  const [unauthor, setUnAuthor] = useState([...props.unauthor]);
  let i=1;
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
          toast.success("Theater Admin Authorise");
          // setUnAuthor(loadingAdminHome());
        } else {
          toast.error(result["error"]);
        }
      }).catch((error) => {
        toast.error(error.response.data.Data)
    });
  }

  return ( 
    <div className="container">
      <center>
        <table className="table table-striped">
          <thead>
            <tr style={{ fontWeight: "bold" }}>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Mobile No.</td>
              <td>Email</td>
              <td>Status</td>
              <td>Authorise Theater_admin</td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {unauthor.map((author) => {
              return (
                <tr key={i++}>
                  <td>{author.FirstName}</td>
                  <td>{author.LastName}</td>
                  <td>{author.mobile_no}</td>
                  <td>{author.email}</td>
                  <td>Not Authorise</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ backgroundColor: "none" }}
                      onClick={() => {
                        Authorise(author.userId);
                      }}
                    >
                      Authorise
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default UnAuthourizeDisplay;
