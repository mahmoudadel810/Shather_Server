import cloudinaryConnect from "../Services/Cloudaniry.js";


//CLOUDINARY UPLOAD
export const cloudinaryUpload = async (filePath,folder = 'shather' ) => {
  try {
    const {secure_url , public_id} = await cloudinaryConnect().uploader.upload(filePath, {
      folder
    });
    return{ secure_url , public_id} ; 
  } catch (error) {
    console.log(error);
    throw new Error('Image upload failed');
  }
};
//clodinary update
export const cloudinaryUpdate = async (filePath,publicId,folder = 'shather' ) => {
  try {
    const {secure_url , public_id} = await cloudinaryConnect().uploader.upload(filePath, {
      folder,
      public_id:publicId,
    });
    return{ secure_url , public_id} ; 
  } catch (error) {
    console.log(error);
    throw new Error('Image upload failed');
  }
};
//CLOUDINARY DELETE
export const cloudinaryDelete = async (publicId) => {
  try {
    const result = await cloudinaryConnect().uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Image delete failed');
  }
};

//CLOUDINARY DELETE ALL
export const cloudinaryDeleteAll = async (folder) => {
  try {
    const result = await cloudinaryConnect().api.delete_resources_by_prefix(folder);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Image delete failed');
  }
};
//CLOUDINARY DELETE ALL FOLDER
export const cloudinaryDeleteAllFolder = async (folder) => {
  try {
    const result = await cloudinaryConnect().api.delete_folder(folder);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('Image delete failed');
  }
};
