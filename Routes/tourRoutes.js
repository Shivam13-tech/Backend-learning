const express = require('express')
const tourController = require("../Controllers/tourController")   // get all methods 
const router = express.Router()           // This Router is like our middleware 

router
    .route("/")               // It will get the complete address from our middleware anything additional will be given like /:id below
    .get(tourController.getAllTours)
    .post(tourController.addTour)

router
    .route("/:id")
    .get(tourController.getTourByID)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


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