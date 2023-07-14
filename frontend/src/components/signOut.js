import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userRole } from "../Slice/seatNumberSelecction";


function SignOut(prop) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  function logout() {
    if (sessionStorage.role === "user") {
      sessionStorage.clear();
      nav("/home");
      dispatch(userRole({ userRoleValue: "User" }));
      toast.error("User Logged Out");
    }else{
        sessionStorage.clear();
      nav("/signin");
      toast.error("Logged Out");
    }
  }

  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        logout();
      }}
    >
      Signout
    </button>
  );
}

export default SignOut;
