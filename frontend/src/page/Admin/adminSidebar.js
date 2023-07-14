import { useNavigate } from "react-router";
import SignOut from "../../components/signOut";

function AdminSidebar() {
  const Nav = useNavigate();

  return (
    sessionStorage.role === "Admin" && (
      <div
        className="container"
        style={{
          backgroundColor: "black",
          paddingTop: 0,
          marginLeft: 0,
          paddingLeft: 0,
          height: "100%",
          marginTop: 0,
          position: "sticky",
        }}
      >
        <ul style={{ listStyleType: "none" }}>
          <li
            style={{
              marginTop: "1rem",
              marginBottom: "2rem",
              marginLeft: "0",
              textAlign: "center",
            }}
          >
            <h5 style={{ color: "white" }}>Welcome , </h5>
            <h5 style={{ color: "white" }}>{sessionStorage.username}</h5>
          </li>
        </ul>
        <div
          className="container"
          style={{
            backgroundColor: "black",
            height: "100vh",
            paddingTop: 0,
            marginTop: "5rem",
          }}
        >
          <center>
            <ul style={{ listStyleType: "none" }}>
              <li
                style={{
                  margin: "1rem",
                  marginLeft: "0",
                  marginBottom: "2rem",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/adminhome");
                  }}
                >
                  Home
                </button>
              </li>
              <li
                style={{
                  margin: "1rem",
                  marginLeft: "0",
                  marginBottom: "2rem",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/addmovie");
                  }}
                >
                  Add Movie
                </button>
              </li>
              <li
                style={{
                  margin: "1rem",
                  marginLeft: "0",
                  marginBottom: "2rem",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/EditMovie");
                  }}
                >
                  Edit Movie Poster
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/theaterrevenue");
                  }}
                >
                  Theater Revenue
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/movierevenue");
                  }}
                >
                  Movie Revenue
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    Nav("/movierevenuebydate");
                  }}
                >
                  Movie Revenue By Date
                </button>
              </li>
              <li style={{ margin: "1rem", marginLeft: "0" }}>
                <SignOut url="/signin"></SignOut>
              </li>
            </ul>
          </center>
        </div>
      </div>
    )
  );
}

export default AdminSidebar;
