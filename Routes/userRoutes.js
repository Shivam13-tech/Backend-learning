const express = require('express')
const userController = require("../Controllers/userController")   // get all methods 
const router = express.Router()


router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.addUser)

router
    .route("/:id")
    .get(userController.getUserByID)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

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