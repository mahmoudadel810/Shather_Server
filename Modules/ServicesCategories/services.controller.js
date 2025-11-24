import { Category } from "../../DB/Models/category.js";
import { cloudinaryDelete, cloudinaryUpdate, cloudinaryUpload } from "../../Utils/cloudinaryMethod.js";
// create service category
export const createServiceCategory = async (req, res, next) => {
 
    const { title, description } = req.body;
    const user = req.user;

    //check category title exist
    const categoryFound = await Category.findOne({ title });
    if (categoryFound) next(new Error('Category title already exist'));

    //add image to cloudinary
   const {secure_url , public_id}= await cloudinaryUpload(req.file.path,'category');
  //  console.log(secure_url,public_id);
   

    const serviceCategory = await Category.create({
      title,
      description,
      image:{
        secure_url,
        public_id,
      },
      user: user._id,
    });
    res.status(201).json({
      message: 'Service category created successfully',
      serviceCategory,
    });
  
};


//update service category
export const updateServiceCategory = async (req, res, next) => {
  const { title, description } = req.body;
  const user = req.user;
  const {categoryId} = req.params;

  //check category exist
  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) next(new Error('Category not found'));


  

  //add image to cloudinary
  var image
  if(!req.file){
    
    image= categoryExist.image;
  }
  if(req.file){
    image= await cloudinaryUpdate(req.file.path,categoryExist.image.public_id,'category');
    console.log(image);
    
  }
 
//  console.log(secure_url,public_id);
  

  const serviceCategory = await Category.findByIdAndUpdate(categoryId,{
    title,
    description,
    image,
    user: user._id,
  },{new:true});
  res.status(201).json({
    message: 'Service category updated successfully',
    serviceCategory,
  });
}



// delete service category
export const deleteServiceCategory = async (req, res, next) => {
  const { categoryId } = req.params;
// console.log(  categoryId);

  //check category exist
  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) next(new Error('Category not found'));

console.log(categoryExist.image.public_id);

  //delete image from cloudinary
  await cloudinaryDelete(categoryExist.image.public_id);

  //delete category
  await Category.findByIdAndDelete(categoryId);
  res.status(200).json({
    message: 'Service category deleted successfully',
  });
}


//get all service categories
export const getAllServiceCategories = async (req, res, next) => {
  const serviceCategories = await Category.find();
  res.status(200).json({
    message: 'Service categories retrieved successfully',
    serviceCategories,
  });
}