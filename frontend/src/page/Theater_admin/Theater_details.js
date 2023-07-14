import AddTheater from "../../components/Theater_Admin/AddTheater";
import EditTheater from "../../components/Theater_Admin/EditTheater";
import TheaterAdminSidebar from "./sidebar";
import { useSelector } from "react-redux";

const Theaterdetail = () => {
  const theaterObj = useSelector((state) => state.Theaterobject.theaterObject);

  return (
    sessionStorage.role === "Theater_Admin" && (
      <div
        className="container-fluid"
        style={{ top: 0, paddingLeft: 0, width: "100%", display: "flex" }}
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
          <TheaterAdminSidebar></TheaterAdminSidebar>
        </div>
        {(theaterObj.length === 0 && <AddTheater />) || (
          <EditTheater theaterObj={theaterObj} />
        )}
      </div>
    )
  );
};

export default Theaterdetail;
