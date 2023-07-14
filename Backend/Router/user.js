const express = require("express");

const router = express.Router();
const db = require("../db");
const Cryptojs = require("crypto-js");
const util = require("../utils");
const jwt = require("jsonwebtoken");
const { request, response } = require("express");

// USER SIGNUP
router.post("/signup", (request, response) => {
  try {
    let { FirstName, LastName, mobile_no, email, password, role } =
      request.body;
    const encriptdpassword = String(Cryptojs.MD5(password));
    if (FirstName === undefined || FirstName.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid Firstname"));
    } else if (LastName === undefined || LastName.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid Lastname"));
    } else if (
      mobile_no === undefined ||
      !(
        mobile_no.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) &&
        !mobile_no.match(/0{5,}/)
      )
    ) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid mobile Number"));
    } else if (
      email === undefined ||
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid Email"));
    } else if (password === undefined || password.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid password"));
    } else if (role === undefined || role.length <= 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid role"));
    } else {
      const statement = `insert into user (first_name, last_name, mobile_no, email, password, role) values( ?,?,?,?,?,?);`;
      if (role == "Theater Administrator") {
        role = "unAuthorise";
      }
      if (role == "Admin") {
        role = "unAuthorise";
      }
      db.pool.query(
        statement,
        [FirstName, LastName, mobile_no, email, encriptdpassword, role],
        (error, result) => {
          response.send(util.createResult(error, result));
        }
      );
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//USER SIGNIN
router.post("/signin", (request, response) => {
  try {
    const { email, password } = request.body;
    const encriptdpassword = String(Cryptojs.MD5(password));
    const statement = `Select * From user where email = ? And password=? ;`;
    if (email === undefined || email.length === 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid Email"));
    } else if (password === undefined || password.length === 0) {
      response
        .status(400)
        .send(util.createCustomResult("error", "Enter valid password"));
    } else {
      db.pool.query(statement, [email, encriptdpassword], (error, Data) => {
        const result = {};
        if (error) {
          result["Status"] = "error";
          result["error"] = "user does not exist";
          response
          .send(
            util.createCustomResult("error", "user does not exist")
          );
        } else if (Data.length == 0) {
          
          result["Status"] = "error";
          result["error"] = "user does not exist";
          response
          .send(
            util.createCustomResult("error", "user does not exist")
          );
        } else if (Data[0].role == "unAuthorise") {
          response
            .status(401)
            .send(
              util.createCustomResult("error", "Error UnAuthorized User !!")
            );
        } else {
          const token = jwt.sign(
            { userId: Data[0].userId, Role: Data[0].role },
            "2msb8tHMu26mGOcm"
          );
          let name = Data[0].first_name + " " + Data[0].last_name;
          result["Status"] = "success";
          result["data"] = {
            username: name,
            emailid: Data[0].email,
            role: Data[0].role,
            token,
          };
          response.send(result);
        }
      });
    }
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

//Have to create seperate component for the MOVIE & REVIEW
router.get("/getreview=:movieId", async (request, response) => {
  try {
    const movieId = request.params.movieId;
    const statement = `
      SELECT review, userName, DATE_FORMAT(TnD,"%Y-%m-%d") as date, TIME(TnD) as time, userId FROM review WHERE movieId=?`;

    const [result] = await db.poolasync.query(statement, [movieId]);
    response.send(result);
  } catch (e) {
    response
      .status(404)
      .send(util.createCustomResult("error", "Error Bad Request !!"));
  }
});

// GET BOOKED TICKET OF PERTICULAR USER
router.get("/getbookedticket", (request, response) => {
  try {
    if (request.Role == "User") {
      const statement = `select a.seatNo, b.booking_status ,b.bookingId,b.totalPrice,c.show_date - DATE(SYSDATE()) AS date_diff,
            c.show_start_Time - Time(SYSDATE()) AS time_diff,c.language,c.format,
            DATE_FORMAT(c.show_date,"%d-%m-%Y") AS show_date,c.show_start_Time,d.screenName,
            e.theaterName,CONCAT(e.address,",",e.city,",",e.pincode) AS address,f.movie_name FROM bookingseat a 
            INNER JOIN booking b ON a.bookingId=b.bookingId AND b.userId=? 
            INNER JOIN movie_show c ON b.showId=c.showId 
            INNER JOIN screen d ON c.screenId=d.screenId 
            INNER JOIN theater e ON d.theaterId=e.theaterId 
            INNER JOIN movie f ON c.MovieId=f.movieId ORDER BY b.createdTimestamp DESC ;`;
      db.pool.query(statement, [request.userId], (error, result) => {
        let combineResult = [];
        if (result === undefined || result.length == 0) {
        } else {
          let start = 0;
          let end = result.length;
          let res = result[0];
          let res1 = result[0];
          let bookingId = res.bookingId;
          let bookingId1 = 0;
          let seatId = "";
          result.forEach((info) => {
            start = start + 1;
            if (bookingId === info.bookingId && start !== end) {
              seatId = seatId + "," + info.seatNo;
              bookingId1 = info.bookingId;
            } else if (start === end) {
              if (bookingId === info.bookingId) {
                seatId = seatId + "," + info.seatNo;
                res.seatNo = seatId;
                combineResult.push(res);
              } else {
                if (bookingId1 === info.bookingId) {
                  seatId = "";
                  combineResult.push(info);
                } else {
                  res.seatNo = seatId;
                  seatId = "";
                  combineResult.push(res);
                  combineResult.push(info);
                }
              }
            } else {
              res.seatNo = seatId;
              res1 = res;
              seatId = "";
              res = info;
              seatId = res.seatNo;
              bookingId = info.bookingId;
              combineResult.push(res1);
            }
          });
        }

        combineResult.map((result) => {
          if (result.date_diff >= 0) {
            if (result.date_diff === 0) {
              if (result.time_diff > 0) {
                result.cancel = 0;
              } else {
                result.cancel = 1;
              }
            } else {
              result.cancel = 0;
            }
          } else {
            result.cancel = 1;
          }
        });
        response.send(util.createResult(error, combineResult));
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

//Adding review using UserId & moiveId
router.post("/addreview", (request, response) => {
  try {
    const { review, userName, movieId } = request.body;
    if (request.Role == "User") {
      if (review === undefined || review.length >= 160) {
        response
          .status(400)
          .send(util.createCustomResult("error", "Review too long"));
      } else {
        let userName1 = userName;
        if (userName === "") {
          userName1 = "Anonymous";
        }

        const statement = `INSERT INTO review(review, username, movieId, userId) VALUES(?,?,?,?);`;

        db.pool.query(
          statement,
          [review, userName1, movieId, request.userId],
          (error, result) => {
            response.send(util.createResult(error, result));
          }
        );
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

// CANCEL BOOKED TICKET OF PERTICULAR USER
router.put("/cancelticket", async (request, response) => {
  const { bookingId } = request.body;
  try {
    if (request.Role == "User" && bookingId > 0) {
      const statement = `Start Transaction;
      SELECT count(*) As counts FROM bookingseat WHERE bookingId=? for Update;
      UPDATE bookingseat SET bookingId=NULL where bookingId=?;
      UPDATE booking SET booking_status=1 where bookingId=? and booking_status=0;
      commit;`;

      const [result1] = await db.poolasync.query(statement, [
        bookingId,
        bookingId,
        bookingId,
      ]);
      response.send(util.createCustomResult("success", "success"));
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
module.exports = router;
