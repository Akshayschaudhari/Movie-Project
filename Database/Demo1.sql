-- Create Database
create database Movie_Booking;

-- Movietable

CREATE TABLE movie(movieId int primary key AUTO_INCREMENT, 
movie_name varchar(60) NOT NULL,
Description varchar(1000) NOT NULL,
genre varchar(50) NOT NULL, 
language varchar(50) NOT NULL,
format varchar(20) NOT NULL, 
release_Date Date NOT NULL, 
image varchar(250) ,
imageLandscape varchar(250),
trailer varchar(250) NOT NULL,
Duration varchar(20) NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

--ALTER TABLE movie ADD COLUMN imageLandscape varchar(150);

/*
movie : 1
Name:Baahubali: The Beginning
Description: Baahubali: The Beginning is a 2015 Indian epic action drama film directed by S. S. Rajamouli
Geners:Adventure
Langauge:Hindi
Format:3D
Release Date:2022-06-06
Trailer:https://www.youtube.com/watch?v=VdafjyFK3ko 
Duration : 2 hr 30 min


 movie:2
 Name:Bhool Bhulaiyaa 2
 Description:Bhool Bhulaiyaa 2 (transl. Labyrinth 2) is a 2022 Indian Hindi-language comedy horror film directed by Anees Bazmee, written by Aakash Kaushik and 
 Farhad Samji, and produced by Bhushan Kumar and Krishan Kumar under the banner T-Series Films and Murad Khetani and Anjum Khetani under the banner Cine1 Studios.
 Geners:Horror
 Langauge:Hindi
Format: 3D
 Release Date:2022-05-20
 Trailer:https://www.youtube.com/watch?v=P2KRKxAb2ek


 movie : 3
Name:K.G.F: Chapter 2
Description: K.G.F: Chapter 2 is a 2022 Indian Kannada-language period action film written and directed by Prashanth Neel, and produced by Vijay Kiragandur under the banner Hombale Films.
Geners:Action
Langauge:Hindi
Format:3D
Release Date:2022-04-14
Trailer:https://www.youtube.com/watch?v=JKa05nyUmuQ 

 movie : 4
Name: R.R.R.
Description: A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.
Geners:Action, Drama
Langauge: Hindi, English, Telugu
Format:2D
Release Date:2022-04-14
Trailer:https://www.youtube.com/watch?v=f_vbAtFSEc0

movie : 5 
Name: Brahmastra Part One: Shiva
Description: This is the story of Shiva who sets out in search of love and self-discovery. During his journey, he has to face many evil forces that threaten our existence.
Geners:Action, Fantasy, Drama
Langauge: Hindi, English
Format: 
Release Date:2022-09-09
Trailer:https://www.youtube.com/watch?v=V5jVntRVl-0


movie : 6
Name: De Dhakka 2
Description: Mr. Makarand Jadhav, and his funnily weird family land in London but they get embroiled in the financial scam and find themselves in the hands of the Pakistani mafia. To escape this ordeal they embark on a road trip adventure once again.
Geners:Drama, Comedy
Langauge: Marathi, Hindi
Format:2D
Release Date:2022-09-09
Trailer:https://www.youtube.com/watch?v=hF-EuYqQJs0

*/


-- user table
CREATE TABLE user(userId int primary key AUTO_INCREMENT, 
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
mobile_no varchar(15) NOT NULL,
email varchar(100) unique NOT NULL, 
password varchar(100) NOT NULL,
role varchar(15) NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

/*
user 1 :
{
    "FirstName" : "abhishek",
    "LastName" : "bavaskar",
    "mobile_no": 154545554, 
    "email" : "ab@gmail",
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
    "role" : "Theater administrator"
}

user 3 :
{
    "FirstName" : "aniket",
    "LastName" : "madwe",
    "mobile_no": 56545158, 
    "email" : "aniket@gmail",
    "password": "pass@1234",
    "role" : "Theater administrator"
}

user 4 :
{
    "FirstName" : "akshay",
    "LastName" : "bhapkar",
    "mobile_no": 54214254, 
    "email" : "akshayb@gmail",
    "password": "pass@1234",
    "role" : "Theater administrator"
}

user 5 :
{
    "FirstName" : "nilesh",
    "LastName" : "bavaskar",
    "mobile_no": 125896, 
    "email" : "nilesh@gmail",
    "password": "pass@1234",
    "role" : "Theater administrator"
}

user 6 :
{
    "FirstName" : "Abhi",
    "LastName" : "bavaskar",
    "mobile_no": 14255, 
    "email" : "abhi@gmail",
    "password": "pass@12345",
    "role" : "Theater administrator"
}
*/

-- Theater table

CREATE TABLE theater(theaterId int primary key AUTO_INCREMENT, 
theaterName varchar(50) NOT NULL,
pincode int NOT NULL,
address varchar(250) NOT NULL, 
city varchar(50) NOT NULL, 
userId int NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userId) REFERENCES user(userId)
ON DELETE CASCADE ON UPDATE CASCADE
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

theater 3 :
first signin and then use token of user 4
{
  "theaterName" : "Theater 3", 
  "pincode" : 4215601,
   "address" : "plot 152/7811, area 1",
   "city" : "jalgaon"
}

theater 4 :
first signin and then use token of user 5
{
  "theaterName" : "Theater 4", 
  "pincode" : 4215601,
   "address" : "block 18/157",
   "city" : "jalgaon"
}
*/

-- Screen Table
CREATE TABLE screen(screenId int primary key auto_increment, 
screenName varchar(50) NOT NULL,
theaterId int NOT NULL,
silver_seat_qty int NOT NULL,
golden_seat_qty int NOT NULL,
rowSeatQty int NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (theaterId) REFERENCES theater(theaterId)
ON DELETE CASCADE ON UPDATE CASCADE
);

/*
--1.
{
    "screenName" : "A1", 
    "theaterId": 1, 
    "silver_seat_qty" : 50, 
    "golden_seat_qty" : 50,
    "rowSeatQty" : 10
}

--2.
{
    "screenName" : "A2", 
    "theaterId": 1, 
    "silver_seat_qty" : 50, 
    "golden_seat_qty" : 75,
    "rowSeatQty" : 15
}

--3.
{
    "screenName" : "B1", 
    "theaterId": 2, 
    "silver_seat_qty" : 60, 
    "golden_seat_qty" : 70,
    "rowSeatQty" : 18
}

--4.
{
    "screenName" : "C1", 
    "theaterId": 3, 
    "silver_seat_qty" : 100, 
    "golden_seat_qty" : 100,
    "rowSeatQty" : 12
}
--5.
{
    "screenName" : "C2", 
    "theaterId": 3, 
    "silver_seat_qty" : 75, 
    "golden_seat_qty" : 90,
    "rowSeatQty" : 9
}

--6.
{
    "screenName" : "C3", 
    "theaterId": 3, 
    "silver_seat_qty" : 85, 
    "golden_seat_qty" : 50,
    "rowSeatQty" : 7
}

--7.
{
    "screenName" : "D1", 
    "theaterId": 4, 
    "silver_seat_qty" : 125, 
    "golden_seat_qty" : 100,
    "rowSeatQty" : 15
}

--8.
{
    "screenName" : "D2", 
    "theaterId": 4, 
    "silver_seat_qty" : 75, 
    "golden_seat_qty" : 75,
    "rowSeatQty" : 10
}
*/

-- Show Table

CREATE TABLE movie_show(showId int primary key auto_increment, 
MovieId int NOT NULL,
show_start_Time Time NOT NULL,
show_end_Time Time NOT NULL,
show_date Date NOT NULL, 
screenId int NOT NULL, 
silver_seat_price int NOT NULL,
golden_seat_price int NOT NULL,
language varchar(20) NOT NULL,
format varchar(20) NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (movieId) REFERENCES movie(movieId)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (screenId) REFERENCES screen(screenId)
ON DELETE CASCADE ON UPDATE CASCADE
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

3.
{
    "MovieId" : 1,
     "show_start_Time" : "02:00:00", 
     "show_date" : "2022-08-08", 
     "screenId" : 4, 
     "silver_seat_price" : 150, 
     "golden_seat_price" : 170,
     "show_end_Time" : "05:00:00"
}

4.
{
    "MovieId" : 1,
     "show_start_Time" : "05:00:00", 
     "show_date" : "2022-08-08", 
     "screenId" : 5, 
     "silver_seat_price" : 100, 
     "golden_seat_price" : 130,
     "show_end_Time" : "08:00:00"
}

5.
{
    "MovieId" : 1,
     "show_start_Time" : "05:00:00", 
     "show_date" : "2022-08-08", 
     "screenId" : 6, 
     "silver_seat_price" : 80, 
     "golden_seat_price" : 100,
     "show_end_Time" : "08:00:00"
}

6.
{
    "MovieId" : 1,
     "show_start_Time" : "09:00:00", 
     "show_date" : "2022-08-08", 
     "screenId" : 7, 
     "silver_seat_price" : 120, 
     "golden_seat_price" : 150,
     "show_end_Time" : "12:00:00"
}

7.
{
    "MovieId" : 1,
     "show_start_Time" : "09:00:00", 
     "show_date" : "2022-08-08", 
     "screenId" : 8, 
     "silver_seat_price" : 130, 
     "golden_seat_price" : 180,
     "show_end_Time" : "12:00:00"
}

8.
{
    "MovieId" : 2,
     "show_start_Time" : "09:00:00", 
     "show_date" : "2022-09-05", 
     "screenId" : 7, 
     "silver_seat_price" : 130, 
     "golden_seat_price" : 180,
     "show_end_Time" : "12:00:00"
}
*/

-- Booking Table

CREATE TABLE booking(bookingId int primary key AUTO_INCREMENT, 
showId int NOT NULL,
seatQtyBooked int NOT NULL,
paymentId int DEFAULT 653154,
paymentType int NOT NULL,
totalPrice double NOT NULL,
userId int NOT NULL,
booking_status int NOT NULL DEFAULT 0,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (showId) REFERENCES movie_show(showId)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (userId) REFERENCES user(userId)
ON DELETE CASCADE ON UPDATE CASCADE
);

 -- paymentmode=1=online 
 -- paymentmode=2=offline 


-- Booking and seat connection Table

CREATE TABLE bookingseat(bookingId int, 
seatNo int NOT NULL,
showId int NOT NULL,
createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (bookingId) REFERENCES booking(bookingId)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (showId) REFERENCES movie_show(showId)
ON DELETE CASCADE ON UPDATE CASCADE,
PRIMARY KEY (seatNo,showId)
);

-- Review Table

CREATE TABLE review(
review varchar(160)  Not null,
userId int Not null,
movieId int  Not null,
TnD timestamp Not null default CURRENT_TIMESTAMP,
username varchar(30) default 'anonymous',
FOREIGN KEY(movieId) REFERENCES movie(movieId),
FOREIGN KEY(userId) REFERENCES user(userId),
CONSTRAINT UC_userNmovie UNIQUE(userId, movieId));

/*
Insert into review(userId, movieId, review, username) values(1, 1, "movie 1 review by user 1", "User0001");
Insert into review(userId, movieId, review, username) values(1, 2, "movie 2 review by user 1", "User0001");
Insert into review(userId, movieId, review, username) values(1, 3, "movie 3 review by user 1", "User0001");
Insert into review(userId, movieId, review, username) values(2, 1, "movie 1 review by user 2", "User0002");
Insert into review(userId, movieId, review, username) values(2, 2, "movie 2 review by user 2", "User0002");
Insert into review(userId, movieId, review, username) values(2, 3, "movie 3 review by user 2", "User0002");
*/7