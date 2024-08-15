const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
// const upload = require("../utils/multer")

exports.getAllUsers = catchAsyncError(async (req, res) => {
  const user = await Register.find();
  res.status(200).json(user);
});

exports.getUsers = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const user = await Register.findById(id);
  res.status(200).json(user);
});

exports.getUpdateUsers = [
  
  catchAsyncError(async (req, res) => {
    const id = req.params.id;
    const { password, ...inputs } = req.body;

    if (id !== req.user.id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    let updateData = { ...inputs };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updateUser = await Register.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json( updateUser);
  }),
];

exports.DeleteUsers = catchAsyncError(async (req, res) => {
  const id = req.params.id;

  const user = await Register.findByIdAndDelete(id);

  if (!user) {
    return res.status(401).json("User Not Found");
  }

  res.status(200).json({ meaage: "user Deleted" });
});
