const Review = require("./../Models/reviewModel");
const catchAsync = require("./../Utils/catchAsync")
const factory = require("../Controllers/handlerFactory")


exports.getAllReviews = factory.getAll(Review);
// exports.getAllReviews = catchAsync(async(req,res,next)=>{
//     let filter = {}
//     if(req.params.tourId) filter = {tour: req.params.tourId}
//     const reviews = await Review.find(filter)

//     res.status(200).json({
//         status: "success",
//         results: reviews.length,
//         data: {
//             reviews
//         }
//     })
// })

exports.setTourUserIds = (req,res,next)=>{           // EXTRA functionality which is not present for createOne factory function
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id; 
    next()
}

exports.createReview = factory.createOne(Review);
// exports.createReview = catchAsync(async(req,res,next)=>{
//     //For nested routes
//     if(!req.body.tour) req.body.tour = req.params.tourId;
//     if(!req.body.user) req.body.user = req.user.id;  //Comes from protect middleware
//     const newReview = await Review.create(req.body)

//     res.status(200).json({
//         status: "success",
//         data: {
//             review: newReview
//         }
//     })
// })

exports.getReviewByID = factory.getOne(Review)
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);