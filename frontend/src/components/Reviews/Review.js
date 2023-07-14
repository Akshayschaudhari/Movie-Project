import { useEffect } from "react";
import ReviewDisplaySingle from "./ReviewDisplaySingle";

function ReviewDisplay(props) {
  let reviewArray = props.reviewArray;
  let renderInc = 0;
  let i = 1;

  useEffect(() => {
    init_carousel();
  }, []);

  const init_carousel = () => {
    let myCarousel = document.querySelector(".carousel-control-next");

    if (myCarousel) myCarousel.click();
  };

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {reviewArray.map((reviewSingle) => {
          return (
            //is Inc is non zero item
            (!renderInc++ && (
              <div className="carousel-item active" key={i++}>
                <ReviewDisplaySingle reviewSingle={reviewSingle} />
              </div>
            )) || (
              <div className="carousel-item" key={i++}>
                <ReviewDisplaySingle reviewSingle={reviewSingle} />
              </div>
            )
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="false"
          style={{ position: "inherit", left: "0.5rem" }}
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
          style={{ position: "inherit", right: "0.5rem" }}
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default ReviewDisplay;
