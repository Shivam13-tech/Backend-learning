const express = require('express')
const userController = require("../Controllers/userController")   // get all methods 
const authController = require("../Controllers/authController")
const router = express.Router()

router.post('/signup', authController.signup);       //This doesn't fir the MVC architecture bcoz it just has a single functionality of signup for such routes we don't add them like below
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get('/me', authController.protect,userController.getMe, userController.getUserByID)
router.patch('/updateMyPassword',authController.protect,authController.updatePassword);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

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