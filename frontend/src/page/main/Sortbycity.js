import { useNavigate } from "react-router";
import Carousel1 from "../../components/carousel";
import { useLocation } from "react-router-dom"
import "./Home.css";
import ShowSingleMovie from "../../components/Home/showSingleMovie";
import { useDispatch } from "react-redux";
import {setGenreSelected , setFormatSelected , setLanguageSelected} from "../../Slice/filterSlice"

const Cityget = () => {
  let i=1;
  const loc = useLocation()
  const dispatch = useDispatch();

  const { sortedmovie } = loc.state
  const navigate = useNavigate();

  const navigateToShowAll = () => {
    dispatch(setGenreSelected(""));
    dispatch(setFormatSelected(""));
    dispatch(setLanguageSelected(""));
    navigate("/nowshowing");
  };

  return (
    <div className="container">
      <Carousel1></Carousel1>

      <br></br>
      <br></br>
      <div className="row" style={{marginBottom: '1rem'}}>
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
          <button
            className="btn btn-warning"
            style={{ marginLeft: 10}}
            onClick={() => {
              navigateToShowAll();
            }}
          >
            See All
          </button>
        </div>
      </div>

      {sortedmovie.map((movie) => {
        return (
          <ShowSingleMovie key={i++} movie={movie}/>
        );
      })}
    </div>
  );
};

export default Cityget;
