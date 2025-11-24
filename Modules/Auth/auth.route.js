import Router from "express";
import expressAsyncHandler from 'express-async-handler';
import * as authController from "./auth.controller.js";
import { validateRequest } from "../../middleware/validation.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import accessRole from "../../Utils/accessRole.js";
import { checkAuth } from "../../middleware/auth.middleware.js";
import { multerMiddlewareLocal } from "../../Utils/Malter.js";
import { allowedExtintion } from "../../Utils/allawedExtintion.js";




const router = Router();

// Auth routes
router.post('/register',validateRequest(registerSchema), expressAsyncHandler(authController.rigister));

router.post('/login',validateRequest(loginSchema), expressAsyncHandler(authController.login));

//get user profile
router.get('/profile',checkAuth(accessRole.USER), expressAsyncHandler(authController.getUserProfile));
//uplode
router.post('/', multerMiddlewareLocal(allowedExtintion.code, 'code').single('image'), expressAsyncHandler(authController.uplode));

//get user 
router.get('/allUsers',expressAsyncHandler(authController.getAllUsers))

//get employees
router.get('/allEmployees',expressAsyncHandler(authController.getAllEmployees))


// edit user by admin to uplode user image and update your jop , rate and reviewsCount , role
router.put('/editUserByAdmin/:id',checkAuth(accessRole.ADMIN), multerMiddlewareLocal(allowedExtintion.image, 'image').single('image'), expressAsyncHandler(authController.editUserByAdmin));








export default router