import { Category } from "../../DB/Models/category.js";
import { Photo } from "../../DB/Models/photo.js";
import { cloudinaryDelete, cloudinaryUpdate, cloudinaryUpload } from "../../Utils/cloudinaryMethod.js";



//create photo
export const createPhoto = async (req, res, next) => {
  const { title, description,category } = req.body;
  const userId = req.user._id;
  console.log(req.body);
  
  //check category exist
  const categoryExist = await Category.findOne({title : category});
  if (!categoryExist) next(new Error('Category not found'));

  const categoryName = categoryExist.title;

  // add image to cloudinary
  const image = await cloudinaryUpload(req.file.path,`photo/${title}`);

  //create photo
  const photo = await Photo.create({
    title,
    description,
    image,
    user: userId,
    category: categoryName,
  });

  //return photo
  res.status(201).json({
    message: 'Photo created successfully',
    photo,
  });
}


//update photo
export const updatePhoto = async (req, res, next) => {
  const { title, description,category  } = req.body;
  const {photoId} = req.params;
  const userId = req.user._id;

  //check photo exist
  const photoExist = await Photo.findById(photoId);
  if (!photoExist) next(new Error('Photo not found'));
  
  //check category exist
  const categoryExist = await Category.findOne({title : category});
  if (!categoryExist) next(new Error('Category not found'));
// console.log(categoryExist);

  const categoryId = categoryExist._id;
// console.log(categoryId);

var image ;
  // add image to cloudinary
  if (req.file) {
     image = await cloudinaryUpdate(req.file.path,photoExist.image.public_id,`photo/${title}`);
  }
  
  if (!req.file) {
     image = photoExist.image;
  }
// console.log(image );

  //update photo
  const photo = await Photo.findByIdAndUpdate(
    photoId,
    {
      title,
      description,
      image,
      user: userId,
      category: category.title,
    },
    { new: true }
  );

  //return photo
  res.status(201).json({
    message: 'Photo updated successfully',
    photo,
  });
}

//deletePhoto
export const deletePhoto = async (req, res, next) => {
  const photoId = req.params.photoId;
  const userId = req.user._id;

  //check photo exist
  const photoExist = await Photo.findById(photoId);
  if (!photoExist) next(new Error('Photo not found'));
  //check user is owner of photo
  // if (photoExist.user.toString() !== userId.toString()) next(new Error('You are not owner of this photo'));

  //delete image from cloudinary
  await cloudinaryDelete(photoExist.image.public_id);

  //delete photo
  await Photo.findByIdAndDelete(photoId);

  //return photo
  res.status(201).json({
    message: 'Photo deleted successfully',
  });
}


//get All photo

export const getAllPhoto=async (req,res,next)=>{

const allPhoto = await Photo.find()

if (!allPhoto ) return next(new Error('photo is not found ',{cause:404}))
if (allPhoto.length == 0 ) return res.status(201).json({
message:"photo is empty please add photo",
allPhoto
})
//  next(new Error(' ',{cause:404}))


res.status(200).json({
  message:'All photo',
  allPhoto    

})
}
// ...existing code...
export const getPhotosByCategory = async (req, res, next) => {
  const { category } = req.query;
  // console.log(category);

  // check category exist
  const categoryExist = await Category.findOne({ title: category });
  console.log(categoryExist);
  
  // console.log(categoryExist);
  
  if (!categoryExist) return next(new Error('Category not found'));

  // find photos by category id
  const photos = await Photo.find({ category });
  // console.log(photos , "===========");
  

  if (!photos || photos.length === 0) return next(new Error('No photos found for this category'));

  res.status(200).json({
    message: `Photos in category ${category}`,
    photos,
  });
}