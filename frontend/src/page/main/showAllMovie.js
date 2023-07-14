import axios from "axios";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";

import ShowSingleMovie from "../../components/Home/showSingleMovie";
import GenreDDList from "../../components/showAllMovie/GenreDDList";
import FormatDDList from "../../components/showAllMovie/FormatDDList";
import LangDDList from "../../components/showAllMovie/LangDDList";
import config from "../../config";

function ShowAll() {
  const [listings, setListings] = useState([]);
  let i=1;
  const genreSelected = useSelector(
    (state) => state.FilterShowMovie.genreSelected
  );
  let formatSelected = useSelector(
    (state) => state.FilterShowMovie.formatSelected
  );
  let langSelected = useSelector(
    (state) => state.FilterShowMovie.languageSelected
  );

  let City = useSelector((state) => state.SeatSelection.city);

  useEffect(() => {
    filterHomes();
  }, [genreSelected, formatSelected, langSelected,City]);

  function filterHomes() {
    const body = {
      genre: genreSelected,
      format: formatSelected,
      language: langSelected,
      city: City,
    };
    axios
      .post(config.serverURL+"/Theater/getFilteredMovie", body, {
        headers: {
          token: sessionStorage.token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["Status"] === "success") {
          setListings(result["data"]);
        } else {
          toast.error(result["error"]);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.Data);
      });
  }

  return (
    <div className="container" style={{ position: "relative", top: "1rem" }}>
      <section style={{ marginBottom: "1rem" }}>
        <div className="row">
          <div className="col" style={{ fontWeight: "bolder", fontSize: 25 }}>
            NOW SHOWING:
          </div>
          <div
            className="col"
            style={{
              textAlign: "end",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <GenreDDList />
            <FormatDDList />
            <LangDDList />
          </div>
        </div>
      </section>

      <section>
        <div>
          {
            <section>
              <div className="row">
                <div className="col" style={{ fontSize: 25 }}>
                  Filtered By- Genre :{" "}
                  <b>{genreSelected.length > 0 ? genreSelected : "All"}</b>,
                  Format :{" "}
                  <b>{formatSelected.length > 0 ? formatSelected : "All"}</b>,
                  Language :{" "}
                  <b>{langSelected.length > 0 ? langSelected : "All"}</b>.
                </div>
                {City.length > 0 && (
                  <div
                    className="col"
                    style={{
                      fontSize: 25,
                      textAlign: "end",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    Location : <b style={{marginLeft: '0.5rem'}}>{City}</b>
                  </div>
                )}
              </div>
            </section>
          }
        </div>
      </section>

      <section>
        <div style={{ position: "relative", marginTop: 50 }}>
          <div>
            {listings.map((movie) => {
              return <ShowSingleMovie key={i++} movie={movie} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShowAll;
