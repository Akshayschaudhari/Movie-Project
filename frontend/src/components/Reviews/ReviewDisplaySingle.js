function ReviewDisplaySingle(props) {
  let reviewObj = props.reviewSingle;
  return (
    <div className="card" style={{backgroundColor:"antiquewhite"}}>
      <div className="card-body" style={{position: "inherit", left:"2rem "}}>
        <h5 className="card-title">{reviewObj.userName}</h5>
        <p className="card-text">{reviewObj.review}</p>
        <p style={{marginBottom:"0.1rem"}}>{reviewObj.date}</p>
      </div>
    </div>
  );
}

export default ReviewDisplaySingle;
