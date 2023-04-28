const express = require('express')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const compression = require("compression")
const AppError = require("./Utils/appError")
const globalErrorhandler = require("./Controllers/errorController")
const tourRouter = require("./Routes/tourRoutes")
const userRouter = require("./Routes/userRoutes")
const reviewRouter = require("./Routes/reviewRoutes")
const bookingRouter = require("./Routes/bookingRoutes")

const app = express()

app.use(helmet());           //Securing http headers

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
app.use('/api', limiter);      //Rate limiting for brute force attack

app.use(express.json({ limit: '10kb' }))        // This middleware is important to add incoming response data
//Limit here to handle incoming data to avoid unwanted huge datasets


//After the data comes to us:
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());          //discards symbols and dots in input field

// Data sanitization against XSS
app.use(xss());   // gets rid of html+js code if someone tries



// Prevent parameter pollution
app.use(
    hpp({
      whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
      ]
    })
  );


///////////////// Compression //////////////

app.use(compression())
//////////////// Tour resources //////////////

app.use("/api/v1/tours", tourRouter)        // tourRouter works as our middleware for request response cycle when user perform action

///////////// User resources //////////////

app.use("/api/v1/users", userRouter)       // userRouter works as our middleware for request response cycle when user perform action

//////////////// Review resources //////////////

app.use("/api/v1/reviews", reviewRouter)        // reviewRouter works as our middleware for request response cycle when user perform action

//////////////// Booking resources //////////////

app.use("/api/v1/bookings", bookingRouter)

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




















