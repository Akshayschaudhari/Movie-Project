const express = require("express");
const util = require("../utils");
const router = express.Router();
const db = require("../db");

//Adding Theater Screen
router.post("/addtheaterscreen", async (request, response) => {
  try {
    const { ScreenName, silver_seat_qty, golden_seat_qty, rowSeatQty } =
      request.body;
    if (ScreenName === undefined || ScreenName.length === 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid screen name"));
    } else if (silver_seat_qty === undefined || silver_seat_qty <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid silver seat qty"));
    } else if (golden_seat_qty === undefined || golden_seat_qty <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid golden seat qty"));
    } else if (rowSeatQty === undefined || rowSeatQty <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid rowSeatQty"));
    } else {
      if (request.Role == "Theater_Admin") {
        const [theaterid] = await db.poolasync.query(
          `select theaterId from theater where userId=${request.userId}`
        );
        const statement = `insert into screen(ScreenName, silver_seat_qty, golden_seat_qty, rowSeatQty,theaterId) values(?,?,?,?,?)`;

        db.pool.query(
          statement,
          [
            ScreenName,
            silver_seat_qty,
            golden_seat_qty,
            rowSeatQty,
            theaterid[0].theaterId,
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
    response.status(404).send(util.createCustomResult("error", "Error"));
  }
});

//Getting booking stats
router.post("/bookstats", (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const { screenno, date } = request.body;
      if (
        screenno != undefined &&
        screenno.length > 0 &&
        date != undefined &&
        date.length > 0
      ) {
        const statement = `select p.movie_name,m.show_start_Time,m.showId,sum(b.seatQtyBooked) As book,(sc.silver_seat_qty+sc.golden_seat_qty) as Total_Seat from booking b 
        inner join movie_show m on b.showId=m.showId 
        inner join movie p on p.movieId=m.movieId 
        inner join screen sc on m.screenId=sc.screenId 
        where b.booking_status = 0 and m.show_date=? and sc.screenName=? group by showId,show_start_Time,movie_name;`;

        db.pool.query(statement, [date, screenno], (error, result) => {
          response.send(util.createResult(error, result));
        });
      }
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
//Get ScrrenID
router.get("/getscreenId", (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const statement = `select screenId , screenName from screen where theaterId in (select theaterId from theater where userId=?)`;
      db.pool.query(statement, [request.userId], (error, result) => {
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

// ADDING SHOW
router.post("/addshow", async (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const {
        MovieId,
        show_start_Time,
        show_date,
        screenId,
        silver_seat_price,
        golden_seat_price,
        show_end_Time,
        language,
        format,
      } = request.body;
      if (format === undefined || format.length === 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid format"));
      } else if (MovieId === undefined || MovieId <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid MovieId"));
      } else if (show_start_Time === undefined || show_start_Time.length <= 0) {
        response
          .status(400)
          .send(
            util.createCustomResult("error", "Enter valid show start Time")
          );
      } else if (show_date === undefined || show_date.length <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid show date"));
      } else if (screenId === undefined || screenId <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid screenId"));
      } else if (silver_seat_price === undefined || silver_seat_price <= 0) {
        response
          .status(400)
          .send(
            util.createCustomResult("error", "Enter valid silver seat price")
          );
      } else if (golden_seat_price === undefined || golden_seat_price <= 0) {
        response
          .status(400)
          .send(
            util.createCustomResult("error", "Enter valid golden seat price")
          );
      } else if (show_end_Time === undefined || show_end_Time.length <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid show end Time"));
      } else if (language === undefined || language.length <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid language"));
      } else {
        const statement1 = `select Timediff(?, show_start_Time) > 0 AS times1 , Timediff(?, show_end_Time) >= 0 AS timee1 
        ,Timediff(?, show_start_Time) <= 0 AS times2 , Timediff(?, show_start_Time) <= 0 AS timee2 from movie_show where screenId=? and show_date=?;`;

        const [bookedSeats] = await db.poolasync.query(statement1, [
          show_start_Time,
          show_start_Time,
          show_start_Time,
          show_end_Time,
          screenId,
          show_date,
        ]);

        let flag = true;
        bookedSeats.map((T) => {
          if (
            (T.times1 == 1 && T.timee1 == 1) ||
            (T.times2 == 1 && T.timee2 == 1)
          ) {
          } else {
            flag = false;
          }
        });

        if (flag) {
          const statement = `insert into movie_show(MovieId, show_start_Time, show_date, screenId, silver_seat_price, golden_seat_price , show_end_Time,language,format) values(?,?,?,?,?,?,?,?,?)`;

          db.pool.query(
            statement,
            [
              MovieId,
              show_start_Time,
              show_date,
              screenId,
              silver_seat_price,
              golden_seat_price,
              show_end_Time,
              language,
              format,
            ],
            (error, result) => {
              response.send(util.createResult(error, result));
            }
          );
        } else {
          response
            .status(404)
            .send(
              util.createCustomResult("error", "Screen is already occupied !!")
            );
        }
      }
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

//GETTING SEAT QTY FOR SCREEN
router.get("/getseatQty/:showId", (request, response) => {
  // SET
  try {
    const { showId } = request.params;
    if (showId != undefined && showId > 0) {
      const statement = `select silver_seat_qty , golden_seat_qty,rowSeatQty from screen where screenId=(select screenId from movie_show where showId = ? )`;

      db.pool.query(statement, [showId], (error, result) => {
        response.send(util.createResult(error, result));
      });
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// ADDING THEATER
router.post("/addtheater", async (request, response) => {
  // SET
  try {
    if (request.Role == "Theater_Admin") {
      const { TheaterName, Address, City, Pincode } = request.body;

      if (TheaterName === undefined || TheaterName.length === 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid Theater name"));
      } else if (Address === undefined || Address.length <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid Address"));
      } else if (City === undefined || City.length <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid City"));
      } else if (Pincode === undefined || Pincode <= 0) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Enter valid Pincode"));
      } else {
        const statement1 = `select COUNT(*) AS Theater_Count from theater where userId=?`;

        const [theater] = await db.poolasync.query(statement1, [
          request.userId,
        ]);
        if (theater[0].Theater_Count == 0) {
          const statement = `insert into theater(theaterName,pincode,address,city,userId) values(?,?,?,?,?)`;

          db.pool.query(
            statement,
            [TheaterName, Pincode, Address, City, request.userId],
            (error, result) => {
              response.send(util.createResult(error, result));
            }
          );
        } else {
          response
            .status(401)
            .send(
              util.createCustomResult("error", "Only 1 Theater Allowed !!")
            );
        }
      }
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

// GET MOVIE
router.get("/getmovie", (request, response) => {
  // SET

  const statement = `select movieId, movie_name, Description, genre, language, format, DATE_FORMAT(release_Date,"%Y-%m-%d") as date, release_Date, image, imageLandscape, trailer, Duration from movie Order by release_Date DESC `;
  //   const statement = `select * from movie`;
  db.pool.query(statement, (error, result) => {
    response.send(util.createResult(error, result));
  });
});

// GET SEAT OBJECT
router.get("/getseatobj/:showId", async (request, response) => {
  try {
    const { showId } = request.params;
    const statement1 = `select silver_seat_qty , golden_seat_qty,rowSeatQty from screen where screenId=(select screenId from movie_show where showId = ? )`;

    const [result] = await db.poolasync.query(statement1, [showId]);
    const silverseatcount = [];
    const goldenseatcount = [];

    const statement2 = `select seatNo from bookingseat where bookingId= ANY(select bookingId from booking where showId = ? )`;
    const [resu1] = await db.poolasync.query(statement2, [showId]);

    const statement3 = `select silver_seat_price , golden_seat_price from movie_show where  showId = ? `;
    const [resu2] = await db.poolasync.query(statement3, [showId]);

    for (let j = 1; j <= result[0].silver_seat_qty; j++) {
      // const flag = resu1.indexOf(j)
      const flag = resu1.findIndex((ab) => {
        return ab.seatNo == j;
      });
      if (flag == -1) {
        silverseatcount.push({
          i: j,
          selectstatus: true,
          available: false,
          price: resu2[0].silver_seat_price,
        });
      } else {
        silverseatcount.push({
          i: j,
          selectstatus: true,
          available: true,
          price: resu2[0].silver_seat_price,
        });
      }
    }
    for (
      let j = result[0].silver_seat_qty + 1;
      j <= result[0].silver_seat_qty + result[0].golden_seat_qty;
      j++
    ) {
      const flag = resu1.findIndex((ab) => {
        return ab.seatNo == j;
      });

      if (flag == -1) {
        goldenseatcount.push({
          i: j,
          selectstatus: true,
          available: false,
          price: resu2[0].golden_seat_price,
        });
      } else {
        goldenseatcount.push({
          i: j,
          selectstatus: true,
          available: true,
          price: resu2[0].golden_seat_price,
        });
      }
    }
    const res = [silverseatcount, goldenseatcount, result[0].rowSeatQty];
    response.send(res);
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GET Theater BY SCREEN ID
router.get("/gettheater/:screenId", (request, response) => {
  try {
    const { screenId } = request.params;
    if (screenId != undefined && screenId > 0) {
      const statement = `select * from theater where theaterId=(select theaterId from screen where screenId= ?)`;
      db.pool.query(statement, [screenId], (error, result) => {
        response.send(util.createResult(error, result));
      });
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GET GETSHOW THEATER WISE SHOW DETAILS USING LOCATION
router.post("/getshow", async (request, response) => {
  // SET
  try {
    const { city, today, MovieId, langauge, format } = request.body;
    if (city === undefined || city.length === 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid city"));
    } else if (today === undefined || today.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid date"));
    } else if (MovieId === undefined || MovieId <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid MovieId"));
    } else if (langauge === undefined || langauge.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid langauge"));
    } else if (format === undefined || format.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid format"));
    } else {
      let date = new Date();
      const statement = `select * from theater where LOWER(city)=LOWER(?)`;

      const [theater] = await db.poolasync.query(statement, [city]);

      for (let i = 0; i < theater.length; i++) {
        const statement = `select screenId , screenName from screen where theaterId=?`;
        const [screen] = await db.poolasync.query(statement, [
          theater[i].theaterId,
        ]);
        theater[i].Screen = screen;
      }

      for (let i = 0; i < theater.length; i++) {
        const statement = `select screenId , screenName from screen where theaterId=?`;
        const [screen] = await db.poolasync.query(statement, [
          theater[i].theaterId,
        ]);
        theater[i].Screen = screen;
      }

      for (let i = 0; i < theater.length; i++) {
        const statement = `select showId, MovieId, show_start_Time - Time(SYSDATE()) AS time_diff,show_start_Time, show_end_Time,screenId, DATE_FORMAT(show_date,"%Y-%m-%d") AS show_date from movie_show
        where screenId IN (?) AND show_date = ? AND MovieId = ? AND language = ? AND format = ?  `;
        const screenids = [];
        theater[i].Screen.map((a) => {
          screenids.push(a.screenId);
        });
        const [show] = await db.poolasync.query(statement, [
          screenids,
          today,
          MovieId,
          langauge,
          format,
        ]);

        let show1 = show.filter((s) => {
          if (date.toISOString().slice(0, 10) == s.show_date) {
            if (s.time_diff < 0) {
            } else {
              return s;
            }
          } else {
            return s;
          }
        });
        theater[i].Show = show1;
      }

      let theater1 = theater.filter((a) => {
        return a.Show.length != 0;
      });
      response.send(theater1);
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//Have to create seperate component for the MOVIE & REVIEW
router.get("/getreview=:movieId", async (request, response) => {
  const movieId = request.params.movieId;
  const statement = `
    SELECT review, userName, DATE_FORMAT(TnD,"%Y-%m-%d") as date, TIME(TnD), userId as time FROM review WHERE movieId=?`;

  const [result] = await db.poolasync.query(statement, [movieId]);
  response.send(result);
});

//get movie by city name
router.get("/getmoviebycity/:cityname", (request, response) => {
  try {
    const { cityname } = request.params;
    if (cityname != undefined && cityname.length > 0) {
      // const statement = `select distinct movie_name from movie m inner join movie_show mv on m.MovieId=mv.MovieId inner join screen sc on sc.screenId=mv.screenId inner join theater th on th.theaterId=sc.theaterId where city=?`
      const statement = `select distinct m.movieId,m.movie_name,m.imageLandscape,m.Description,m.genre,m.language,m.format,m.release_Date,m.image,m.trailer,m.Duration from movie m
      inner join movie_show mv on m.MovieId=mv.MovieId
      inner join screen sc on sc.screenId=mv.screenId
      inner join theater th on th.theaterId=sc.theaterId
      where lower(city)=lower(?)`;
      db.pool.query(statement, [cityname], (error, result) => {
        response.send(util.createResult(error, result));
      });
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});
//get city by name
router.get("/getcityname", (request, response) => {
  try {
    const statement = `Select distinct(CONCAT(UCASE(LEFT(city, 1)),SUBSTRING(city, 2))) as city from theater`;
    db.pool.query(statement, (error, result) => {
      response.send(util.createResult(error, result));
    });
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//get movie by city name
router.get("/getmoviebycity/:cityname", (request, response) => {
  try {
    const { cityname } = request.params;
    // const statement = `select distinct movie_name from movie m inner join movie_show mv on m.MovieId=mv.MovieId inner join screen sc on sc.screenId=mv.screenId inner join theater th on th.theaterId=sc.theaterId where city=?`
    const statement = `select distinct m.movieId,m.movie_name,m.Description,m.genre,m.language,m.format,m.release_Date,m.image,m.trailer,m.duration from movie m inner join movie_show mv on m.MovieId=mv.MovieId inner join screen sc on sc.screenId=mv.screenId inner join theater th on th.theaterId=sc.theaterId where lower(city)=lower(?)`;
    db.pool.query(statement, [cityname], (error, result) => {
      response.send(util.createResult(error, result));
    });
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});
//get city by name
router.get("/getcityname", (request, response) => {
  try {
    const statement = `Select distinct(CONCAT(UCASE(LEFT(city, 1)),SUBSTRING(city, 2))) as city from theater`;
    db.pool.query(statement, (error, result) => {
      response.send(util.createResult(error, result));
    });
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//Get Movie Show filtered by screenId
router.get("/getShowAtScreen/:screenId", async (request, response) => {
  try {
    const { screenId } = request.params;
    if (screenId != undefined && screenId >= 0) {
      const statement = `SELECT s.screenId, ms.showId, m.movie_name, s.screenName, ms.show_start_Time, ms.show_end_Time,DATE_FORMAT(ms.show_date,"%Y-%m-%d") as date, ms.language, ms.format FROM movie_show ms
    INNER JOIN movie m ON ms.MovieId=m.movieId
    INNER JOIN screen s ON s.screenId=ms.screenId
    where ms.screenId=? AND ms.show_date>=now()
    ORDER BY ms.show_date Desc, ms.show_start_Time;`;

      const [res] = await db.poolasync.query(statement, [screenId]);
      if (res.length === 0) {
        response
          .status(204)
          .send(util.createCustomResult("error", "No data to fetch"));
      } else {
        response.send(res);
      }
    } else {
      response
        .status(404)
        .send(util.createCustomResult("error", "Error Bad Request !!"));
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//Get Theater Details
router.get("/getTheater", (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const statement = `Select * from theater where userId=?`;
      db.pool.query(statement, [request.userId], (error, data) => {
        response.send(util.createResult(error, data));
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

//UPDATE Theater Details
router.put("/updateTheater", (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const { theaterId, TheaterName, Address } = request.body;
      const statement = `update theater set theaterName=?, address=? where theaterId=?`;

      db.pool.query(
        statement,
        [TheaterName, Address, theaterId],
        (error, data) => {
          response.send(util.createResult(error, data));
        }
      );
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
// GET MOVIE BY NAME
router.get("/getmovie/:movie_name", (request, response) => {
  // SET
  try {
    const { movie_name } = request.params;
    if (movie_name != undefined && movie_name.length > 0) {
      const statement = `select movieId ,Duration, movie_name,image , Description , genre , language , duration , format , release_Date , imageLandscape,trailer from movie where LOWER(movie_name) like LOWER('%${movie_name}%')`;
      db.pool.query(statement, (error, result) => {
        if (result === undefined || result.length == 0) {
          response
            .status(404)
            .send(util.createCustomResult("error", "No movie found"));
        } else {
          response.send(util.createResult(error, result[0]));
        }
      });
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//GET SHOW BOOKING STAT
router.post("/allbookstats", async (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const { showId } = request.body;
      if (showId != undefined && showId > 0) {
        let statement = `SELECT u.first_name, u.last_name,s.seatNo FROM user u 
          INNER JOIN booking b ON u.userId=b.userId AND b.showId=?
          INNER JOIN bookingseat s ON s.bookingId = b.bookingId;`;

        db.pool.query(statement, [showId], (error, data) => {
          response.send(util.createResult(error, data));
        });
      } else {
        response
          .status(404)
          .send(util.createCustomResult("error", "Error No show Available !!"));
      }
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

//GET ALL SHOW USING SCREEN AND DATE
router.post("/getshows", async (request, response) => {
  try {
    if (request.Role == "Theater_Admin") {
      const { screenno, date } = request.body;
      if (
        screenno != undefined &&
        screenno.length > 0 &&
        date != undefined &&
        date.length > 0
      ) {
        const statement = `select showId, show_start_Time from movie_show where screenId=(select screenId from screen where screenName = ?) and show_date=?;`;

        db.pool.query(statement, [screenno, date], (error, result) => {
          response.send(util.createResult(error, result));
        });
      }
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

// BOOK TICKET
router.post("/confirmticket", async (request, response) => {
  try {
    const { showId, seatQtyBooked, totalPrice, seatno, paymentType } =
      request.body;
    if (showId === undefined || showId <= 0)
      response
        .status(400)
        .send(util.createCustomResult("error", "Wrong Input !!"));
    else if (seatQtyBooked === undefined || seatQtyBooked <= 0)
      response
        .status(400)
        .send(util.createCustomResult("error", "Wrong Input !!"));
    else if (totalPrice === undefined || totalPrice <= 0)
      response
        .status(400)
        .send(util.createCustomResult("error", "Wrong Input !!"));
    else if (seatno === undefined || seatno.length <= 0)
      response
        .status(400)
        .send(util.createCustomResult("error", "Wrong Input !!"));
    else if (
      paymentType === undefined ||
      (paymentType != 2 && paymentType != 1)
    )
      response
        .status(400)
        .send(util.createCustomResult("error", "Wrong paymentType !!"));
    else if (request.Role == "User") {
      try {
        let booked = [];
        // getting payment id
        const statement4 = `select paymentId from booking order by paymentId desc limit 1;`;

        const [result2] = await db.poolasync.query(statement4);
        let paymentId = 653154;
        if (result2.length > 0) {
          paymentId = result2[0].paymentId + 1;
        }
        let statement1 = `insert into booking(showId ,seatQtyBooked , paymentId , totalPrice , paymentType ,userId ) values(?,?,?,?,?,?)`;

        // INSERTING BOOKING INFORMATION
        const [result] = await db.poolasync.query(statement1, [
          showId,
          seatQtyBooked,
          paymentId,
          totalPrice,
          paymentType,
          request.userId,
        ]);
        // INSERTING BOOKED SEAT INFORMATION
        let statement2 = `Start Transaction;
          SELECT count(*) As counts FROM bookingseat WHERE showId=${showId} for Update;`;
        for (let i = 0; i < seatno.length; i++) {
          statement2 =
            statement2 +
            `Update bookingseat set bookingId=${result.insertId}, createdTimestamp=CURRENT_TIMESTAMP() where seatNo=${seatno[i]} and 
            showId=${showId} and bookingId IS NULL;`;
        }

        statement2 =
          statement2 +
          `commit;select count(*) As count from bookingseat where bookingId=${result.insertId}`;
        const [result1] = await db.poolasync.query(statement2);
        // CHECKING SEAT IS BOOKED OR NOT
        const check = result1[result1.length - 1][0].count;
        if (check >= 0) {
          if (check == seatno.length) {
            response.send({ status: false, booked });
          } else {
            let statement5 = `select seatNo from bookingseat where bookingId=?`;
            const [result5] = await db.poolasync.query(statement5, [
              result.insertId,
            ]);
            if (result5.length >= 0) {
              booked = [];
              let booked1 = [];
              result5.map((a) => {
                booked1.push(a.seatNo);
              });
              seatno.map((a) => {
                if (booked1.includes(a)) {
                } else {
                  booked.push(a);
                }
              });
              response.send({ status: true, booked });
            } else {
              response.send({ status: true, booked });
            }
            let statement6 = `start transaction; 
              update bookingseat set bookingId=NULL where bookingId=?; 
              delete from booking where bookingId=?;
              commit;`;
            const [result6] = await db.poolasync.query(statement6, [
              result.insertId,
              result.insertId,
            ]);
          }
        } else {
          if (result1.affectedRows == 1 && seatno.length == 1) {
            response.send({ status: false, booked });
          } else {
            let statement7 = `start transaction; 
              update bookingseat set bookingId=NULL where bookingId=?; 
              delete from booking where bookingId=?;
              commit;`;
            const [result7] = await db.poolasync.query(statement7, [
              result.insertId,
              result.insertId,
            ]);
            response.send({ status: true, booked });
          }
        }
      } catch (e) {
        response
          .status(404)
          .send(util.createCustomResult("error", "Error Bad Request !!"));
      }
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

//GET THE MOVIE FILTERED BY GENRE OR FORMAT OR LANGUAGE
router.post("/getFilteredMovie", (request, response) => {
  try {
    let { genre, format, language, city } = request.body;

    genre = ["%", genre, "%"].join("");
    format = ["%", format, "%"].join("");
    language = ["%", language, "%"].join("");
    city = ["%", city, "%"].join("");

    const statement = `
  select distinct m.movieId,m.movie_name,m.imageLandscape,m.Description,m.genre,m.language,m.format,m.release_Date,m.image,m.trailer,m.Duration
  FROM
    movie m
      inner join movie_show mv on m.movieId=mv.MovieId
      inner join screen sc on sc.screenId=mv.screenId
      inner join theater th on th.theaterId=sc.theaterId
  WHERE
    m.genre LIKE ? AND mv.format LIKE ? AND mv.language LIKE ? AND lower(th.city) LIKE lower(?) AND mv.show_date>=now()
  ORDER BY
    m.release_Date DESC;`;

    db.pool.query(
      statement,
      [genre, format, language, city],
      (error, result) => {
        response.send(util.createResult(error, result));
      }
    );
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

module.exports = router;
