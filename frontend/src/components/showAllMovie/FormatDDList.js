import { useDispatch } from "react-redux";
import { setFormatSelected } from "../../Slice/filterSlice";

function GenreDDList() {
  const dispatch = useDispatch();
  const filterArray = [
    "All Format",
    "2D",
    "3D",
    "Imax 3D"
  ];
  let i=1
  const setSlice = (value) => {
    dispatch(setFormatSelected(value));
  };
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
        style={{ backgroundColor: "darkmagenta", marginLeft:'.5rem'}}
      >
        Format
      </button>
      <ul className="dropdown-menu dropdown-menu-lg-end">
        {filterArray.map((filter) => {
          return (
            <li key={i++}>
              <button
                className="dropdown-item"
                type="button"
                onClick={()=>{
                  if (filter === filterArray[0]) {
                    filter = "";
                  }
                    setSlice(filter)
                }}
              >
                {filter}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GenreDDList;
