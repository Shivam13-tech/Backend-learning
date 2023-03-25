const fs = require('fs')         // Just to read files


const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`))    // We write all our event loop blocking code outside our api calls


exports.checkID = function(req,res,next,value){         // Instead of repeating code to check if the id is valid we create a single middleware that will check and we can use this in our routes
    console.log(value)
    if(req.params.id * 1 > tours.lenght){ 
        return res                   // This is param middleware
        .status(404)
        .json({
            status: "Failed",
            message: "Invalid id"
        })
    }
    next()
}

exports.checkBody = function(req,res,next){      // A middleware to check if we have data in our body 
    if(!req.body.name || !req.body.price){
        return res
        .status(400)
        .json({
            status: "Failed",
            message: "Incomplete data"
        })
    }
    next()
}

exports.getAllTours = function(req,res){        
    res
    .status(200)
    .json({
        status: "Success",
        results: tours.lenght,
        data: { 
            tours : tours                                                          // if key and value has same name we can write only once ES6 feature
        }                                                                         //Tours comes from the prebuild json file and we already learn JSEND format to send data
    })                                               
}

exports.addTour = function(req,res){                                              // The request here holds all the data we plan to send thats why we need app.use(express.json())
    console.log(req.body)                                                      // In console you will find the complete json we shared as object                   
    
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id : newId}, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/data/tours-simple.json`,JSON.stringify(tours),err => {
        res
        .status(201)
        .json({
            status: "success",
            data:{
                tours : newTour
            }
        })
    })
    // res.send("Done")                                                     // We always need to send something to complete the request response cycle
}

exports.getTourByID = function(req,res){                                    // for getting specific tour requested by a unique id eg. tours/5 now only the 5th tour should be shown
    //   console.log(req.params)                                         // This will provide us with that specific id
    // const id = req.params.id * 1
    // if(id > tours.lenght){
    //     return res
    //     .status(404)
    //     .json({
    //         status: "Failed",
    //         message: "Invalid id"
    //     })
    // }
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id)                         // We find the matching id by looping through our json
    res
    .status(200)
    .json({
        status: "success",
        data: {
            tour: tour
        }
    })
}

exports.updateTour = function(req,res){
    // const id = req.params.id * 1
    // if(id > tours.lenght){
    //     return res
    //     .status(404)
    //     .json({
    //         status: "Failed",
    //         message: "Invalid id"
    //     })
    // }
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })                                        // Patch code which will make more sense with database instead of simple object updating on file
}

exports.deleteTour = function(req,res){
    // const id = req.params.id * 1
    // if(id > tours.lenght){
    //     return res
    //     .status(404)
    //     .json({
    //         status: "Failed",
    //         message: "Invalid id"
    //     })
    // }
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })                                        // delete code which will make more sense with database instead of simple object deleting on file
}