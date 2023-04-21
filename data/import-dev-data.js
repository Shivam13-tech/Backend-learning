const fs = require('fs');
const Tour = require("../Models/tourModel");
const User = require("../Models/userModel")
const Review = require("../Models/reviewModel")
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config({path: '../Vars/config.env'})       

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)        

mongoose.connect(DB, {                 // This will help in connecting our express application with mongodb
    useNewUrlParser: true,
}).then(function(connection){
    console.log("Connected to database")
})  

                            // We need connection again bcoz this will run independent of our express appplication

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, {validateBeforeSave: false});  // So we can add all data without making it exact like our validator wants
    await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// To run this seperate file -> new terminal -> move to data folder and node filename.js
// console.log(process.argv)

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
