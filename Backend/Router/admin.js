const express = require("express");
const util = require("../utils");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

// AUTHORIZE THEATER ADMINISTRATOR
router.put("/authorize", (request, response) => {
  // SET
  const { userId } = request.body;
  try {
    if (request.Role == "Admin" && userId > 0) {
      const statement = `UPDATE user SET role='Theater_Admin' WHERE userId=?`;
      db.pool.query(statement, [userId], (error, result) => {
        response.send(util.createResult(error, result));
      });
    } else {
      response
        .status(401)
        .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// Un-AUTHORIZE THEATER ADMINISTRATOR
router.put("/unauthorize", (request, response) => {
  // SET
  const { userId } = request.body;

  try {
    if (request.Role == "Admin" && userId > 0) {
      const statement = `UPDATE user SET role='unAuthorise' WHERE userId=?`;
      db.pool.query(statement, [userId], (error, result) => {
        response.send(util.createResult(error, result));
      });
    } else {
      response
        .status(401)
        .send(util.createCustomResult("error", "Error UnAuthorise User !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// ADD MOVIE
router.post("/addmovie", (request, response) => {
  // SET
  try {
    const {
      movie_name,
      Description,
      genre,
      language,
      format,
      release_Date,
      trailer,
      Duration,
    } = request.body;

    if (movie_name === undefined || movie_name.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid movie name"));
    } else if (Description === undefined || Description.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid Description"));
    } else if (language === undefined || language.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid langauge"));
    } else if (format === undefined || format.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid format"));
    } else if (release_Date === undefined || release_Date.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid release date"));
    } else if (trailer === undefined || trailer.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid trailer link"));
    } else if (Duration === undefined || Duration.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid duration"));
    } else if (genre === undefined || genre.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid duration"));
    } else {
      if (request.Role == "Admin") {
        const statement = `insert into movie
        (movie_name, Description, genre, language, format, release_Date, trailer, Duration)
        values(?,?,?,?,?,?,?,?)`;
        db.pool.query(
          statement,
          [
            movie_name,
            Description,
            genre,
            language,
            format,
            release_Date,
            trailer,
            Duration,
          ],
          (error, result) => {
            response.send(util.createResult(error, result));
          }
        );
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GETTING REVENUE BY MOVIE
router.post("/revenue", (request, response) => {
  // SET
  try {
    const { Id } = request.body;
    if (Id === 0) {
      response
        .status(401)
        .send(util.createCustomResult("error", "Enter Movie"));
    } else {
      if (request.Role == "Admin" && Id > 0) {
        const statement = `SELECT IFNULL(SUM(totalPrice),0) AS revenue FROM booking WHERE booking_status=0 AND showId IN (SELECT showId FROM movie_show WHERE MovieId=?);`;

        db.pool.query(statement, [Id], (error, result) => {
          response.send(util.createResult(error, result));
        });
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GETTING REVENUE OF MOVIE BY DATE
router.post("/movierevenue", (request, response) => {
  // SET
  try {
    const { Id, date } = request.body;
    if (Id === undefined || Id === 0) {
      response
        .status(401)
        .send(util.createCustomResult("error", "Enter Movie"));
    } else if (date === undefined || date.length < 8) {
      response.status(401).send(util.createCustomResult("error", "Enter Date"));
    } else {
      if (request.Role == "Admin") {
        const statement = ` SELECT IFNULL(SUM(totalPrice),0) AS revenue FROM booking WHERE booking_status=0 AND showId IN (SELECT showId FROM movie_show WHERE MovieId=? AND show_date = ? );`;

        db.pool.query(statement, [Id, date], (error, result) => {
          response.send(util.createResult(error, result));
        });
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GETTING ALL MOVIE NAME
router.get("/movie", (request, response) => {
  // SET
  try {
    if (request.Role == "Admin" || request.Role == "Theater_Admin") {
      const statement = `SELECT movieId , movie_name, language, format, Duration, DATE_FORMAT(release_Date,"%Y-%m-%d") as date FROM movie ORDER BY movie_name;`;

      db.pool.query(statement, (error, result) => {
        response.send(util.createResult(error, result));
      });
    } else {
      response
        .status(401)
        .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GETTING REVENUE BY THEATER DATE
router.post("/revenuetheater", async (request, response) => {
  // SET
  try {
    const date = request.body.date;
    if (date === undefined || date.length < 8) {
      response.status(401).send(util.createCustomResult("error", "Enter Date"));
    } else {
      let Id = 0;
      if (request.Role === "Theater_Admin") {
        const statement = `SELECT theaterId FROM theater WHERE userId=?`;

        const [bookedSeats] = await db.poolasync.query(statement, [
          request.userId,
        ]);
        if (bookedSeats.length === 1) Id = bookedSeats[0].theaterId;
      } else {
        Id = request.body.Id;
      }
      if (
        request.Role == "Admin" ||
        (request.Role == "Theater_Admin" && Id > 0)
      ) {
        const statement = `SELECT IFNULL(SUM(a.totalPrice),0) AS revenue , b.show_start_Time,c.movie_name,d.screenName FROM booking a 
        INNER JOIN movie_show b ON a.showId=b.showId AND b.show_date= ? AND booking_status=0  
        INNER JOIN screen d ON d.screenId=b.screenId AND d.theaterId= ?  
        INNER JOIN movie c ON b.MovieId = c.movieId GROUP BY b.showId;`;

        db.pool.query(statement, [date, Id], (error, result) => {
          response.send(util.createResult(error, result));
        });
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GETTING UN-AUTHORIZE THEATER ADMINISTRATOR
router.get("/unauthorize", (request, response) => {
  // SET
  try {
    if (request.Role == "Admin") {
      const statement = `SELECT userId, first_name, last_name, mobile_no, email, role FROM user WHERE role="unAuthorise";`;

      db.pool.query(statement, (error, result) => {
        response.send(util.createResult(error, result));
      });
    } else {
      response
        .status(401)
        .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

router.get("/authorize", (request, response) => {
  // SET
  const { Id } = request.params;

  if (request.Role == "Admin") {
    const statement = `SELECT userId, first_name, last_name, mobile_no, email, role FROM user WHERE role NOT IN ("User","unAuthorise","Admin");`;

    db.pool.query(statement, [Id], (error, result) => {
      response.send(util.createResult(error, result));
    });
  } else {
    response
      .status(401)
      .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
  }
});

// GETTING ALL THEATER
router.get("/gettheater", (request, response) => {
  // SET
  try {
    if (request.Role == "Admin") {
      const statement = `SELECT theaterId, CONCAT(theaterName,", ",address,", ",city,", ",pincode) AS theater FROM theater;`;

      db.pool.query(statement, (error, result) => {
        response.send(util.createResult(error, result));
      });
    } else {
      response
        .status(401)
        .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// ADD PROTRAIT POSTER
router.post(
  "/addimage/:movie_name",
  upload.single("photo"),
  (request, response) => { 
    //SET
    try {
      if (request.Role == "Admin") {
        const filename = request.file.filename;
        const { movie_name } = request.params;
        const statement = `
    UPDATE movie
    SET image = ?
    WHERE movie_name = ?
  `;

        db.pool.query(statement, [filename, movie_name], (error, result) => {
          response.send(util.createResult(error, result));
        });
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    } catch (e) {
      response
        .status(404)
        .send(util.createCustomResult("error", "Error Bad Request !!"));
    }
  }
);

// ADD LANDSCAPE POSTER
router.post(
  "/uploadLandScapePoster/:movie_name",
  upload.single("photo"),
  (request, response) => {
    //SET
    try {
      if (request.Role == "Admin") {
        const filename = request.file.filename;
        const { movie_name } = request.params;
        const statement = `
    UPDATE movie
    SET imageLandscape = ?
    WHERE movie_name = ?
  `;

        db.pool.query(statement, [filename, movie_name], (error, result) => {
          response.send(util.createResult(error, result));
        });
      } else {
        response
          .status(401)
          .send(util.createCustomResult("error", "Error UnAuthorized User !!"));
      }
    } catch (e) {
      response
        .status(404)
        .send(util.createCustomResult("error", "Error Bad Request !!"));
    }
  }
);
module.exports = router;
