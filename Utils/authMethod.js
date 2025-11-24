import jwt from 'jsonwebtoken';
import { User } from '../DB/Models/user.js';



//create token
export const createToken = (user) => {
  const token = jwt.sign({ userId: user._id ,email:user.email,phone:user.phone}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
}

//CHECK USER FOUND
export const checkFound =async (serchKey) => {
    console.log(serchKey)
  const valuecheck = await User.findOne({serchKey});
  
  return valuecheck;
}
