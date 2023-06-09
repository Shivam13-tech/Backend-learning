const express = require('express')
const tourController = require("../Controllers/tourController")   // get all methods 
const authController = require("../Controllers/authController")
const reviewRouter = require("../Routes/reviewRoutes")




// This will only run for this specific route not for the user bcoz its not mention there 
const router = express.Router()           // This Router is like our middleware 



// router.param("id", tourController.checkID)  //No longer needed bcoz id check is from db now       // we create a parameter specific middleware in our case its only id therefore this middleware only takes id
 

router.use("/:tourId/reviews", reviewRouter)  // For this specific route that start with tour we will use our review router

router                              //Aliasing a specific route which gets the most frequent request
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router
    .route("/tour-stats")
    .get(tourController.getTourStats)  //Aggregation pipeline demo

router
    .route('/monthly-plan/:year')
    .get(authController.protect,authController.restrictTo('admin', 'lead-guide', 'guide'),tourController.getMonthlyPlan);

router
    .route("/")               // It will get the complete address from our middleware anything additional will be given like /:id below
    .get(tourController.getAllTours)
    .post(tourController.createTour)
    // .post(tourController.checkBody,tourController.addTour)       // Chaining middleware to check condition before moving to next handler function

router
    .route("/:id")
    .get(tourController.getTourByID)
    .patch(authController.protect,authController.restrictTo('admin', 'lead-guide'),tourController.uploadTourImages, tourController.resizeTourImages, tourController.updateTour)
    .delete(authController.protect,authController.restrictTo('admin', 'lead-guide'),tourController.deleteTour)

// router // Use merge param instead
//     .route("/:tourId/reviews")
//     .post(
//         authController.protect, 
//         authController.restrictTo("user"),
//         reviewController.createReview
//         )
 
module.exports = router


///////// Old code refactoring //////////////

// app.get("/api/v1/tours", getAllTours)                  //Good practice to provide version also with api
// app.post("/api/v1/tours", addTour)
// app.get("/api/v1/tours/:id", getTourByID)
// app.patch("/api/v1/tours/:id", updateTour)
// app.delete("/api/v1/tours/:id", deleteTour)

// app
//     .route("/api/v1/tours")
//     .get(getAllTours)
//     .post(addTour)

// app
//     .route("/api/v1/tours/:id")
//     .get(getTourByID)
//     .patch(updateTour)
//     .delete(deleteTour)


// app
//     .route("/api/v1/users")
//     .get(getAllUsers)
//     .post(addUser)

// app
//     .route("/api/v1/users/:id")
//     .get(getUserByID)
//     .patch(updateUser)
//     .delete(deleteUser)