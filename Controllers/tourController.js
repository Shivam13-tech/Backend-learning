const fs = require('fs')         // Just to read files stored in json
const Tour = require("../Models/tourModel")
const APIFeatures = require("./../Utils/apiFeatures")
const catchAsync = require("../Utils/catchAsync")


exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};


//We know that creating a tour will give us a promise so from now we use async await instead of then catch
exports.createTour = catchAsync(async function(req,res,next){   //Here we are using a seperate function for not using try catch everywhere just an example
  const newTour = await Tour.create(req.body)         // Same as doing const newtour = Tour({...})
  res
      .status(201)
      .json({
          status: "success",
          data:{
              tours : newTour
          }
      })
})


exports.getAllTours = async function(req,res){     
    try {
        const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
        const tours = await features.query

        // Sending response
        res
        .status(200)
        .json({
            status: "Success",
            results: tours.length,
            data: { 
                tours : tours                                                         
            }                                                                         
        })                                               
    } catch(err){
        res
            .status(400)
            .json({
                status: 'failed',
                message: err
                })
    }                                             
}

exports.getTourByID = async function(req,res){                                   
    console.log(req.params.id)                                         // This will provide us with that specific id
    try {
        const tours = await Tour.findById(req.params.id)
        res
        .status(200)
        .json({
            status: "success",
            data: {
                tours: tours
            }
        })
    } catch(err){
        res
            .status(400)
            .json({
                status: 'failed',
                message: err
                })
    }
}

exports.updateTour = async function(req,res){
    try {
        const id = req.params.id
        const tours = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,         // This opitional data will help in returning the updated tour
            runValidators: true  // Strict data type check
        })                      // Filter by the id and update from the request.body
        res
            .status(200)
            .json({
            status: "success",
            data: {
                tours: tours
            }
        })                                        
    } catch(err){
        res
            .status(400)
            .json({
                status: 'failed',
                message: err
                })
    }
}

exports.deleteTour = async function(req,res){
    try {
        const id = req.params.id
        await Tour.findByIdAndDelete(id)
        res
            .status(204)
            .json({
                status: "success",
                data: null
            })               
    } catch(err){
        res
            .status(400)
            .json({
                status: 'failed',
                message: err
                })
    }                               
}


exports.getTourStats = async (req, res) => {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
          $group: {
            _id: { $toUpper: '$difficulty' },
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
          }
        },
        {
          $sort: { avgPrice: 1 }
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };


  exports.getMonthlyPlan = async (req, res) => {
    try {
      const year = req.params.year * 1; // 2021
  
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: '$startDates' },
            numTourStarts: { $sum: 1 },
            tours: { $push: '$name' }
          }
        },
        {
          $addFields: { month: '$_id' }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 12
        }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          plan
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };



                                                            // We no longer need to check id from this bcoz our id will come from mongodb unique

                                                                                    // MIDDLEWARE USECASE //

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`))    // We write all our event loop blocking code outside our api calls

// exports.checkID = function(req,res,next,value){         // Instead of repeating code to check if the id is valid we create a single middleware that will check and we can use this in our routes
//     console.log(value)
//     if(req.params.id * 1 > tours.lenght){ 
//         return res                   // This is param middleware
//         .status(404)
//         .json({
//             status: "Failed",
//             message: "Invalid id"
//         })
//     }
//     next()
// }        

// exports.checkBody = function(req,res,next){      // A middleware to check if we have data in our body 
//     if(!req.body.name || !req.body.price){
//         return res
//         .status(400)
//         .json({
//             status: "Failed",
//             message: "Incomplete data"
//         })
//     }
//     next()
// }

                                                         // Things that are commented bcoz it was using json file now we will use database for our functionality

                                                    
// 1) Get all tours
// exports.getAllTours = function(req,res){        
//     res
//     .status(200)
//     .json({
//         status: "Success",
//         // results: tours.lenght,
//         // data: { 
//         //     tours : tours                                                          // if key and value has same name we can write only once ES6 feature
//         // }                                                                         //Tours comes from the prebuild json file and we already learn JSEND format to send data
//     })                                               
// }


// 2) Create new tours
// exports.addTour = function(req,res){                                              // The request here holds all the data we plan to send thats why we need app.use(express.json())
//     console.log(req.body)                                                      // In console you will find the complete json we shared as object                   
    
//     const newId = tours[tours.length - 1].id + 1
//     const newTour = Object.assign({id : newId}, req.body)

//     tours.push(newTour)
//     fs.writeFile(`${__dirname}/data/tours-simple.json`,JSON.stringify(tours),err => {
//         res
//         .status(201)
//         .json({
//             status: "success",
//             // data:{
//             //     tours : newTour
//             // }
//         })
//     })
//     // res.send("Done")                                                     // We always need to send something to complete the request response cycle
// }


// 3) Get tour by unique id
// exports.getTourByID = function(req,res){                                    // for getting specific tour requested by a unique id eg. tours/5 now only the 5th tour should be shown
//     //   console.log(req.params)                                         // This will provide us with that specific id
//     // const id = req.params.id * 1
//     // if(id > tours.lenght){
//     //     return res
//     //     .status(404)
//     //     .json({
//     //         status: "Failed",
//     //         message: "Invalid id"
//     //     })
//     // }
//     const id = req.params.id * 1
//     // const tour = tours.find(el => el.id === id)                         // We find the matching id by looping through our json
//     res
//     .status(200)
//     .json({
//         status: "success",
//         // data: {
//         //     tour: tour
//         // }
//     })
// }
// 4) Update tour
// exports.updateTour = function(req,res){
//     // const id = req.params.id * 1
//     // if(id > tours.lenght){
//     //     return res
//     //     .status(404)
//     //     .json({
//     //         status: "Failed",
//     //         message: "Invalid id"
//     //     })
//     // }
//     res
//     .status(500)
//     .json({
//         status: "error",
//         message: "Route still under construction"
//     })                                        // Patch code which will make more sense with database instead of simple object updating on file
// }
// 5) Deleted tour
// exports.deleteTour = function(req,res){
//     // const id = req.params.id * 1
//     // if(id > tours.lenght){
//     //     return res
//     //     .status(404)
//     //     .json({
//     //         status: "Failed",
//     //         message: "Invalid id"
//     //     })
//     // }
//     res
//     .status(500)
//     .json({
//         status: "error",
//         message: "Route still under construction"
//     })                                        // delete code which will make more sense with database instead of simple object deleting on file
// }