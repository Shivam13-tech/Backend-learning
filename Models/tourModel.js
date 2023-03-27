const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({           // This is a schema 
    name:{
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: true
    }
})

const Tour = mongoose.model("Tour", tourSchema)         // This is a model which will be created from the schema design/rules
// The Tour here will act as a collection which will hold all data

module.exports = Tour    // we export our Tour model from here and all functionality of crud will take place in controller



// const testTour = new Tour({         creating and storing data
//     name: "The forest hike",
//     rating: 4.7,
//     price: 567
// })

// testTour.save().then(function(result){
//     console.log(result)
// }).catch(function(err){
//     console.log(err)
// })
