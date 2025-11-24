import { User } from "../../DB/Models/user.js";
import { createToken } from "../../Utils/authMethod.js";
import bcrypt from 'bcryptjs';
import { cloudinaryUpload } from "../../Utils/cloudinaryMethod.js";

export const rigister = async (req, res, next) => {

  const { email, password, phone, rePassword, name } = req.body;
  // console.log(email, password, phone,rePassword,name);


  // check if the user already exists
  const user = await User.findOne({ email });
  if (user) next(new Error('User already exists', { cause: 400 }));
  // check if phone already exists
  const phoneUser = await User.findOne({ phone });
  if (phoneUser) next(new Error('Phone already exists', { cause: 400 }));

  // hashPasword 
  const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);

  // create user
  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    phone,

  });


  // send response
  res.status(201).json({
    message: 'User registered successfully , please verify your account',
    user: newUser,
  });




}

// login

export const login = async (req, res, next) => {

  const { email, password } = req.body;

  // check if the user already exists
  const user = await User.findOne({ email });
  if (!user) next(new Error('User not found', { cause: 400 }));

  // compare password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) next(new Error('Incorrect password', { cause: 400 }));

  //create token


  const token = createToken(user);



  // send response
  res.status(200).json({
    message: 'User logged in successfully',
    user,
    token,
  });



}

//get user profile

export const getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
}


//uplode

export const uplode = async (req, res, next) => {
  try {
    // console.log(req.file);

    res.status(200).json({
      message: 'User profile retrieved successfully',
      data: req.file,
    });
  } catch (error) {
    next(error);
  }
}

//get all user

export const getAllUsers = async (req, res, next) => {

  const allUsers = await User.find()
  if (allUsers == [] || !allUsers) return next(new Error("users not founs", { cause: 404 }))

  res.status(200).json({
    message: "all uaer",
    allUsers
  })
}
// get all employees

export const getAllEmployees = async (req, res, next) => {
  const employees = await User.find({ role: 'employee' });
  if (employees.length === 0) return next(new Error('No employees found', { cause: 404 }));
  res.status(200).json({
    message: 'All employees',
    employees
  });
}

// edit user by admin to uplode user image and update your jop , rate and reviewsCount , role 

export const editUserByAdmin = async (req, res, next) => {
  const { jop, rate, reviewsCount, role } = req.body;
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new Error('User not found', { cause: 404 }));

  // update user profile image
  const image = await cloudinaryUpload(req.file.path, `user/${id}`);

  user.profileImage = image;
  user.jop = jop || user.jop;
  user.rate = rate !== undefined ? rate : user.rate;
  user.reviewsCount = reviewsCount !== undefined ? reviewsCount : user.reviewsCount;
  user.role = role || user.role;
  await user.save();
  res.status(200).json({
    message: 'User profile image updated successfully',
    user
  });
}