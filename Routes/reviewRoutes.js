const express = require('express')
const reviewController = require("../Controllers/reviewController")
const authController = require("../Controllers/authController")

const router = express.Router({ mergeParams: true}) 


router.use(authController.protect) // Only authenticated user can post / update reviews

router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(
        // authController.protect,
        authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview
    )

router
    .route('/:id')
    .get(reviewController.getReviewByID)
    .patch(
        authController.restrictTo('user', 'admin'),
        reviewController.updateReview)  //NO GUIDES CAN CHANGE REVIEW
    .delete(
      authController.restrictTo('user', 'admin'),
      reviewController.deleteReview
    );
  

module.exports = router