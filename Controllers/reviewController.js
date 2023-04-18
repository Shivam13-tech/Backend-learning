const Review = require("./../Models/reviewModel");
const catchAsync = require("./../Utils/catchAsync")

exports.getAllReviews = catchAsync(async(req,res,next)=>{
    const reviews = await Review.find()

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews
        }
    })
})

exports.createReview = catchAsync(async(req,res,next)=>{
    const newReview = await Review.create(req.body)

    res.status(200).json({
        status: "success",
        data: {
            review: newReview
        }
    })
})