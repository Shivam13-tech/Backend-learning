const dotenv = require("dotenv")
dotenv.config({path: './config.env'})       // Will read our config info stored and we can use it anywhere in our application
const app = require("./app")               // We need to read all config before our app so that we can read it everywhere else


// Initialize the server
const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log(`App started on port : ${port}`)
})  