const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Register = require("../models/register");



exports.getAllUsers = catchAsyncError(async (req, res) => {
    const user = await Register.find()
    res.status(200).json(user)
  });

exports.getUsers = catchAsyncError(async(req, res)=>{
    
})

exports.getUpdateUsers = catchAsyncError(async(req, res)=>{
    
})


exports.DeleteUsers = catchAsyncError(async(req, res)=>{
    
})