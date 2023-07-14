-- Create Database
create database prac_project;

-- Movietable

CREATE TABLE movie(movieId int primary key auto_increment, 
movie_name varchar(50),
Description varchar(500),
genre varchar(20), 
language varchar(20),
format varchar(20), 
release_Date Date, 
image varchar(100),
trailer varchar(250),
Duration varchar(20)
);

/*
movie : 1
Name:Baahubali: The Beginning
Description: Baahubali: The Beginning is a 2015 Indian epic action drama film directed by S. S. Rajamouli
Geners:Adventure
Langauge:Hindi
Format:3D
Release Date:2022-06-06
Trailer:https://www.youtube.com/watch?v=VdafjyFK3ko 
Duration : 02.30


 movie:2
 Name:Bhool Bhulaiyaa 2
 Description:Bhool Bhulaiyaa 2 (transl. Labyrinth 2) is a 2022 Indian Hindi-language comedy horror film directed by Anees Bazmee, written by Aakash Kaushik and 
 Farhad Samji, and produced by Bhushan Kumar and Krishan Kumar under the banner T-Series Films and Murad Khetani and Anjum Khetani under the banner Cine1 Studios.
 Geners:Horror
 Langauge:Hindi
Format: 3D
 Release Date:2022-05-20
 Trailer:https://www.youtube.com/watch?v=P2KRKxAb2ek
Duration:2h 40m

 movie : 3
Name:K.G.F: Chapter 2
Description: K.G.F: Chapter 2 is a 2022 Indian Kannada-language period action film written and directed by Prashanth Neel, and produced by Vijay Kiragandur under the banner Hombale Films.
Geners:Action
Langauge:Hindi
Format:3D
Release Date:2022-04-14
Trailer:https://www.youtube.com/watch?v=JKa05nyUmuQ 
Duration:2h 40m

 movie : 4
Name:RRR
Description: RRR is a 2022 Indian Telugu-language epic action drama film directed by S. S. Rajamouli who wrote the film with V. Vijayendra Prasad. It is produced by D. V. V. Danayya of DVV Entertainment.
Geners:Action
Langauge:Telugu
Format:3D
Release Date:2022-03-25
Trailer:https://www.youtube.com/watch?v=xo1P2sQdhC0
Duration:2h 40m
*/


-- user table
CREATE TABLE user(userId int primary key auto_increment, 
FirstName varchar(50),
LastName varchar(50),
mobile_no varchar(15),
email varchar(100) unique, 
password varchar(100),
role varchar(15)
);

/*
user 1 :
{
    "FirstName" : "abhishek",
    "LastName" : "bavaskar",
    "mobile_no": 154545554, 
    "email" : "abhi@gmail",
    "password": "pass@1234",
    "role" : "user"
}

user 2 :
{
    "FirstName" : "akshay",
    "LastName" : "chaudhari",
    "mobile_no": 54214841, 
    "email" : "akshay@gmail",
    "password": "pass@1234",
    "role" : "user"
}

user 3 :
{
    "FirstName" : "aniket",
    "LastName" : "madwe",
    "mobile_no": 56545158, 
    "email" : "aniket@gmail",
    "password": "pass@1234",
    "role" : "user"
}
*/

-- Theater table

CREATE TABLE theater(theaterId int primary key auto_increment, 
theaterName varchar(50),
pincode int,
address varchar(200), 
city varchar(50), 
userId int,
FOREIGN KEY (userId) REFERENCES user(userId)
);

/*
theater 1 :
first signin and then use token of user 2
{
  "theaterName" : "Theater 1", 
  "pincode" : 425001,
   "address" : "plot no. 10",
   "city" : "Jalgaon"
}

theater 2 :
first signin and then use token of user 3
{
  "theaterName" : "Theater 2", 
  "pincode" : 4215601,
   "address" : "plot 15",
   "city" : "pune"
}
*/

-- Screen Table
CREATE TABLE screen(screenId int primary key auto_increment, 
screenName varchar(50),
theaterId int,
silver_seat_qty int,
golden_seat_qty int,
FOREIGN KEY (theaterId) REFERENCES theater(theaterId),
available boolean Default true
);

/*
--1.
{
    "screenName" : "A1", 
    "theaterId": 1, 
    "silver_seat_qty" : 50, 
    "golden_seat_qty" : 50
}

--2.
{
    "screenName" : "A2", 
    "theaterId": 1, 
    "silver_seat_qty" : 50, 
    "golden_seat_qty" : 75
}

--3.
{
    "screenName" : "B1", 
    "theaterId": 2, 
    "silver_seat_qty" : 60, 
    "golden_seat_qty" : 70
}

*/

-- Show Table

CREATE TABLE movie_show(showId int primary key auto_increment, 
MovieId int,
show_start_Time Time,
show_end_Time Time,
show_date Date, 
screenId int, 
silver_seat_price int,
golden_seat_price int,
FOREIGN KEY (movieId) REFERENCES movie(movieId),
FOREIGN KEY (screenId) REFERENCES screen(screenId)
);


/*
1.
{
    "MovieId" : 1,
     "show_start_Time" : "11:00:00", 
     "show_date" : "2022-06-06", 
     "screenId" : 1, 
     "silver_seat_price" : 100, 
     "golden_seat_price" : 150,
     "show_end_Time" : "02:00:00"
}

2.
{
    "MovieId" : 1,
     "show_start_Time" : "11:00:00", 
     "show_date" : "2022-06-06", 
     "screenId" : 2, 
     "silver_seat_price" : 80, 
     "golden_seat_price" : 120,
     "show_end_Time" : "02:00:00"
}

*/

-- Booking Table

CREATE TABLE booking(bookingId int primary key auto_increment, 
showId int,
seatQtyBooked int,
paymentId int,
totalPrice double,
FOREIGN KEY (showId) REFERENCES movie_show(showId)
);

-- Booking and seat connection Table

CREATE TABLE bookingseat(bookingId int, 
seatNo int,
FOREIGN KEY (bookingId) REFERENCES booking(bookingId)
);

ALTER TABLE bookingseat
ADD showId int ;

ALTER TABLE bookingseat
ADD FOREIGN KEY (showId) REFERENCES movie_show(showId);