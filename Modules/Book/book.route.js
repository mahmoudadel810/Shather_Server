import { Router } from "express";
import * as bookControler from "./book.controller.js";
import { checkAuth } from "../../middleware/auth.middleware.js";
import accessRole from "../../Utils/accessRole.js";
import expressAsyncHandler from "express-async-handler";



const router = Router();

//create book route
router.post('/createBooking',checkAuth(accessRole.USER), expressAsyncHandler(bookControler.createBooking));
router.get('/getAllBookings', checkAuth(accessRole.ADMIN), expressAsyncHandler(bookControler.getAllBookings));
router.put('/updateBookingStatus/:bookingId', checkAuth(accessRole.EMPLOYEE), expressAsyncHandler(bookControler.updateBookingStatus));
router.delete('/deleteBooking/:bookingId', checkAuth(accessRole.USER), expressAsyncHandler(bookControler.deleteBooking));
router.get('/myBookings/:email', checkAuth(accessRole.USER), expressAsyncHandler(bookControler.getBookingsByEmail));
router.get('/employeeBookings/:employeeId', checkAuth(accessRole.EMPLOYEE), expressAsyncHandler(bookControler.getBookingsByEmployeeId));
router.put('/updateBooking/:bookingId', checkAuth(accessRole.USER), expressAsyncHandler(bookControler.updateBooking));


export default router;


