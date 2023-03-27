const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config({path: './config.env'})       // Will read our config info stored and we can use it anywhere in our application
const app = require("./app")               // We need to read all config before our app so that we can read it everywhere else


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)        // Bcoz password needs to be added in our db connection string

mongoose.connect(DB, {                 // This will help in connecting our express application with mongodb
    useNewUrlParser: true,
    // useCreateIndex: true,             // This options just to avoid deprecation warning but are not required now
    // useFindAndModify: false
}).then(function(connection){
    console.log("Connected to database")
})  






// Initialize the server
const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log(`App started on port : ${port}`)
})  