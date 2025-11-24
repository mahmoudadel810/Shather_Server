import multer from "multer";
import { generateUniqueString } from "./generateUniqueString.js";
import { allowedExtintion } from "./allawedExtintion.js";
import fs from 'fs';
import path from 'path';
export const multerMiddlewareLocal= (
  extintion=allowedExtintion.image,
  filePath = "general"
)=>{
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

      // create file path
      const destinationPath = path.resolve(`uploads/${filePath}`);
      //check if directory exist
      if(!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {

      cb(null, generateUniqueString(7) +'-'+ file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    console.log(extintion.includes(file.mimetype.split('/')[1]));
    
    extintion.includes(file.mimetype.split('/')[1]) ? cb(null, true) : cb(new Error('Invalid file type.'), false);
   
   
  };
  
  const file = multer({fileFilter, storage });
  return file;

}
export const multerMiddlewareHost= (
  extintion=allowedExtintion.image,
  
)=>{
const storage = multer.diskStorage({});
  const fileFilter = (req, file, cb) => {
    console.log(extintion.includes(file.mimetype.split('/')[1]));
    
    extintion.includes(file.mimetype.split('/')[1]) ? cb(null, true) : cb(new Error('Invalid file type.'), false);
   
   
  };
  
  const file = multer({fileFilter, storage });
  return file;

}