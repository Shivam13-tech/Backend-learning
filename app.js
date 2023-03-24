const express = require('express')
const tourRouter = require("./Routes/tourRoutes")
const userRouter = require("./Routes/userRoutes")

const app = express()
app.use(express.json())        // This middleware is important to add incoming response data


//////////////// Tour resources //////////////

app.use("/api/v1/tours", tourRouter)        // tourRouter works as our middleware for request response cycle when user perform action

///////////// User resources //////////////

app.use("/api/v1/users", userRouter)       // userRouter works as our middleware for request response cycle when user perform action


module.exports = app       // we export our app and will use it in server.js




















