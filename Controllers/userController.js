const User = require('../Models/userModel');
const catchAsync = require("../Utils/catchAsync")
const AppError = require('../Utils/appError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  


exports.getAllUsers = function(req,res){
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })
}

exports.addUser = function(req,res){
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })
}

exports.getUserByID = function(req,res){
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })
}

exports.updateUser = function(req,res){
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })
}

exports.deleteUser = function(req,res){
    res
    .status(500)
    .json({
        status: "error",
        message: "Route still under construction"
    })
}
