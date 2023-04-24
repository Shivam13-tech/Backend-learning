const express = require('express')
const userController = require("../Controllers/userController")   // get all methods 
const authController = require("../Controllers/authController")



const router = express.Router()


//AUTHENTICATION APIS
router.post('/signup', authController.signup);       //This doesn't fir the MVC architecture bcoz it just has a single functionality of signup for such routes we don't add them like below
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//PROTECTING EVERYTHING
router.use(authController.protect)     //Bcoz middleware run in sequence This will make sure anything else gets only executed if logged in 

//AUTHENTICATED USER UPDATES + we also remove all authcontroller.protect from this apis bcoz it runs before
router.get('/me',userController.getMe, userController.getUserByID)
router.patch('/updateMyPassword',authController.updatePassword);
router.patch('/updateMe',userController.uploadUserImage,userController.resizeUserPhoto,userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);


// Now only admin will have the power to create / get / update / delete user bcoz this middleware will run 
router.use(authController.restrictTo('admin'))

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