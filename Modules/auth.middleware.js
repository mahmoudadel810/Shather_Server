

//cheack auth token
import jwt from 'jsonwebtoken';
import { User } from '../DB/Models/user.js';




export const checkAuth =  (accessRole) => {
return async(req, res, next) => {
  try {
  //get acssestoken
  const {accesstoken} = req.headers
// console.log(accesstoken,"accesstoken ====================================");

  // console.log(accesstoken);
  
  if(!accesstoken)next(new Error('please login first not accesstoken') )
    
    
    if(!accesstoken.startsWith(process.env.ACCESS_TOKEN_PREFIX))next(new Error('Invalid token format') )
      
      // console.log(accesstoken);

  
    const token = accesstoken.split(process.env.ACCESS_TOKEN_PREFIX)[1].trim();
    //  console.log( "........................................" ,token );
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    
    if(!decoded.userId)next(new Error('Invalid token') )

      //check user exist
    const user = await User.findById(decoded.userId);
    if(!user)next(new Error('User not found sign in first') )

      //auth role
    if(user.role !== accessRole)next(new Error('You are not authorized to access this resource') )
    req.user = user;
    next();
  } catch (error) {
    if(error.name === 'JsonWebTokenError'){
      //check userfound by token
      const user =await User.findOne({token})
      if(!user)next(new Error('User not found sign in first') )
        //CREATE USER TOKEN
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = accessToken;
        //update user isLoggedIn
        user.isLoggedIn = true;
        await user.save();
       //return res refresh token
       return res.status(200).json({
        message: 'Token refreshed successfully',
       token: accessToken 
      });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}
}

