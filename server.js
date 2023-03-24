const app = require("./app")


// Initialize the server
const port = 3000
app.listen(port, function(){
    console.log(`App started on port : ${port}`)
})