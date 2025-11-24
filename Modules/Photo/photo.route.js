import  Router  from "express";
import { checkAuth } from "../../middleware/auth.middleware.js";
import { multerMiddlewareHost } from "../../Utils/Malter.js";
import { allowedExtintion } from "../../Utils/allawedExtintion.js";
import expressAsyncHandler from "express-async-handler";
import * as photoController from "./photo.controller.js";
import accessRole from "../../Utils/accessRole.js";



const router = Router();
//get all 
router.get("/getAllPhoto",expressAsyncHandler(photoController.getAllPhoto))
//get photo by category
router.get("/getPhotoByCategory",expressAsyncHandler(photoController.getPhotosByCategory))
//CREATE PHOTO
router.post("/create",checkAuth(accessRole.ADMIN),multerMiddlewareHost(allowedExtintion.image).single('image'),expressAsyncHandler(photoController.createPhoto)
)
 //update photo
 router.put("/update/:photoId",checkAuth(accessRole.ADMIN),multerMiddlewareHost(allowedExtintion.image).single('image'),expressAsyncHandler(photoController.updatePhoto)
)
//delete photo
router.delete("/delete/:photoId",checkAuth(accessRole.ADMIN),expressAsyncHandler(photoController.deletePhoto)
)

export default router;


