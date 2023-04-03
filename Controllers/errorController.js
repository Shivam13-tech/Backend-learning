module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500       // We get error status code from our error or we set it to default
    err.status = err.status || "Error"           // Same for status code
    res
        .status(err.statusCode)
        .json({
            status: err.status,
            message: err.message
        })
}