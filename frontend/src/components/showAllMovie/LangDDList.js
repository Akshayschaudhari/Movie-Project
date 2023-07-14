import { useDispatch } from "react-redux";
import { setLanguageSelected } from "../../Slice/filterSlice";

function LangDDList() {
  const dispatch = useDispatch();
  let i=1;
  const filterArray = [
    "All Language",
    "English",
    "Gujrati",
    "Hindi",
    "Marathi",
    "Tamil",
    "Telugu",
  ];

  const setSlice = (value) => {
    dispatch(setLanguageSelected(value));
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false"
        style={{
          backgroundColor: "darkmagenta",
          marginLeft: ".5rem",
          marginRight: ".5rem",
        }}
      >
        Language
      </button>
      <ul className="dropdown-menu dropdown-menu-lg-end">
        {filterArray.map((filter) => {
          return (
            <li key={i++}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                  if (filter === filterArray[0]) {
                    filter = "";
                  }
                  setSlice(filter);
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

export default LangDDList;
