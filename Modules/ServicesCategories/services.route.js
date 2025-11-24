import  Router  from "express";
import * as servicesController from "./services.controller.js";
import { multerMiddlewareHost } from "../../Utils/Malter.js";
import { allowedExtintion } from "../../Utils/allawedExtintion.js";
import { checkAuth } from "../../middleware/auth.middleware.js";
import accessRole from "../../Utils/accessRole.js";
import expressAsyncHandler from "express-async-handler";



const router = Router();

//create service category

router.post("/create",checkAuth(accessRole.ADMIN),multerMiddlewareHost(allowedExtintion.image).single('image'),expressAsyncHandler(servicesController.createServiceCategory)
)
//update service category
router.put("/update/:categoryId",checkAuth(accessRole.ADMIN),multerMiddlewareHost(allowedExtintion.image).single('image'),expressAsyncHandler(servicesController.updateServiceCategory)
)
//delete service category
router.delete("/delete/:categoryId",checkAuth(accessRole.ADMIN),expressAsyncHandler(servicesController.deleteServiceCategory)
)
//get all service categories
router.get("/all",expressAsyncHandler(servicesController.getAllServiceCategories)
)

export default router;


