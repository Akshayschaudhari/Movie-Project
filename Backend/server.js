const express = require("express")
const cor = require("cors")
const app = express()
const util = require("./utils")
const jwt = require("jsonwebtoken")
const userR = require("./Router/user")
const theaterR = require("./Router/theater")
const adminR = require("./Router/admin")
app.use(cor())
app.use(express.static('uploads'))
app.use(express.json())

app.use((request, Response, next) => {
    if (request.url === "/Theater/confirmticket" || request.url === "/admin/addmovie"
        || request.url === "/Theater/addimage/:movie_name" || request.url === "/Theater/updateTheater"
        || request.url === "/Theater/addtheater" || request.url === "/Theater/addshow" ||
        request.url === "/Theater/addtheaterscreen" || request.url === "/admin/authorize" || request.url === "/Theater/bookstats"
        || request.url === "/admin/unauthorize" || request.url === "/admin/revenue" 
        || request.url === "/admin/movie" || request.url==="/Theater/allbookstats" || request.url==="/Theater/getshows"
        || request.url === "/admin/movierevenue" || request.url === "/admin/revenuetheater"
        || request.url === "/user/getbookedticket" ||
        request.url === "/Theater/addscreen" || request.url==="/Theater/getscreenId" || request.url==="/user/addreview"
        || request.url==="/user/cancelbookedticket" || request.url === "/admin/revenueshow"
        || request.url === "/admin/gettheater" || request.url === "/user/cancelticket" || request.url ==="/Theater/getTheater" || request.url=== "/Theater/getShowAtScreen/:screenId"
        || request.url.includes("/admin/uploadLandScapePoster") || request.url.includes("/admin/addimage")
    ) {
        try {
            request.userId = jwt.verify(request.headers.token, "2msb8tHMu26mGOcm").userId
            request.Role = jwt.verify(request.headers.token, "2msb8tHMu26mGOcm").Role
            next()
        } catch (e) {
            Response.send(util.createResult("Invalid Token"))
        }
    }
    else {
        next()
    }
})

app.use("/user", userR)
app.use("/Theater", theaterR)
app.use("/admin",adminR)

app.listen(4000, "0.0.0.0", () => {
    console.log("Server started")
})
