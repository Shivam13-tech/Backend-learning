const express = require('express')
const AppError = require("./Utils/appError")
const globalErrorhandler = require("./Controllers/errorController")
const tourRouter = require("./Routes/tourRoutes")
const userRouter = require("./Routes/userRoutes")

const app = express()
app.use(express.json())        // This middleware is important to add incoming response data


//////////////// Tour resources //////////////

app.use("/api/v1/tours", tourRouter)        // tourRouter works as our middleware for request response cycle when user perform action

///////////// User resources //////////////

app.use("/api/v1/users", userRouter)       // userRouter works as our middleware for request response cycle when user perform action


////////////Unhandled route ///////////

app.all('*', (req,res,next)=>{
    // res
    // .status(404)
    // .json({
    //     status: "Failed",
    //     message: `Can't find ${req.originalUrl} on this server!`
    // })
    
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    // err.status = "Fail"
    // err.statusCode = 404

    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorhandler)         // For error setter


module.exports = app       // we export our app and will use it in server.js




















