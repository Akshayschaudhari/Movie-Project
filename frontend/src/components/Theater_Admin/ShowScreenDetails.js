import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from "../../config";

function ShowScreenDetails(props) {
  // Store value --> screenId, screenName
  const screenDetails = props.screen;
 
  const [showArray, setShowArray] = useState([]);
  let i =1;
  let srNo = 0;
  useEffect(() => {
    loadShowDetails(screenDetails);
  }, [screenDetails]);

  const loadShowDetails = (screenDetails) => {
    axios
      .get(
        config.serverURL+"/theater/getShowAtScreen/" +
          screenDetails.screenId,
        {
          headers: {
            token: sessionStorage.token,
          },
        }
      )
      .then((response) => {
        setShowArray(response.data);
       
      }).catch((error) => {
        toast.error(error.response.data.Data)
    });
  };

  return (
    <div className="container" style={{marginBottom: 30}}>
      <h5>Screen : <span style={{fontWeight: "bold"}}>{screenDetails.screenName}</span></h5>
      <hr />
      <center>
        <table className="table table-striped">
          <thead>
            <tr style={{ fontWeight: "bold" }}>
              <td>Sr. No</td>
              <td>Date</td>
              <td>Movie Name</td>
              <td>Start time</td>
              <td>End time</td>
              <td>Language</td>
              <td>Format</td>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {(showArray.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "red"}}>
                  No show currently running on this screen.
                </td>
              </tr>
            )) ||
              showArray.map((show) => {
                return (
                  <tr key={i++}>
                    <td>{++srNo}</td>
                    <td>{show.date}</td>
                    <td>{show.movie_name}</td>
                    <td>{show.show_start_Time}</td>
                    <td>{show.show_end_Time}</td>
                    <td>{show.language}</td>
                    <td>{show.format}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default ShowScreenDetails;
