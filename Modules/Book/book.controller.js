import { BookNow } from "../../DB/Models/bookNow.js";
import { Category } from "../../DB/Models/category.js";
import { User } from "../../DB/Models/user.js";


//create new booking
export async function createBooking(req, res, next) {
  
    const { name, email, phone, date, services, message ,time ,employeeName} = req.body;  
    
    console.log(services);
    
    //check user found
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) next (new Error('User not found', { cause: 404 }));

    //check employee found
    const isEmployeeExist = await User.findOne({ name: employeeName, role: 'employee' });
    if (!isEmployeeExist) next (new Error('Employee not found', { cause: 404 }));

    //check if date > = today
    const today = new Date();
    const bookingDate = new Date(date);
    if (bookingDate < today || bookingDate == today) {
      return next(new Error('Booking date must be today or in the future', { cause: 400 }));
    }
    //check if time is valid
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) {
      return next(new Error('Invalid time format', { cause: 400 }));
    }

    //check if time is in the future for the given date
    const currentTime = new Date();
    const bookingDateTime = new Date(`${date}T${time}:00`);
    if (bookingDateTime < currentTime) {
      return next(new Error('Booking time must be in the future', { cause: 400 }));
    }

    //check if servies is found 

    const categories = await Category.find({ _id: { $in: services } });
    if (categories.length !== services.length) {
      return next(new Error('One or more services not found', { cause: 404 }));
    }
    const serviceTitles = categories.map(category => category.title);
    //create booking
    const newBooking = await BookNow.create({
      name,
      email,
      phone,
      date: bookingDate,
      time,
      services: serviceTitles,
      message,
      employeeId: isEmployeeExist._id,
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });


  }

  //get all bookings
  export async function getAllBookings(req, res, next) {
    const bookings = await BookNow.find().populate('employeeId', 'name email'); 
    return res.status(200).json({
      message: 'All bookings retrieved successfully',
      bookings,
    });
  } 

  //update booking status to opened
  export async function updateBookingStatus(req, res, next) {
    const { bookingId } = req.params;   

    const booking = await BookNow.findById(bookingId);
    if (!booking) return next (new Error('Booking not found', { cause: 404 }));

    booking.isOpened = true;
    await booking.save();
    return res.status(200).json({
      message: 'Booking status updated to opened',
      booking,
    });
  }


  //delete booking
  export async function deleteBooking(req, res, next) {
    const { bookingId } = req.params; 
    const booking = await BookNow.findByIdAndDelete(bookingId);
    if (!booking) return next (new Error('Booking not found', { cause: 404 }));
    return res.status(200).json({
      message: 'Booking deleted successfully',
      booking,
    });
  }

  //get bookings by user email
  export async function getBookingsByEmail(req, res, next) {
    const { email } = req.params; 
    const bookings = await BookNow.find({ email }).populate('employeeId', 'name email');
    //check if bookings found
    if (bookings.length === 0) return next (new Error('No bookings found for this email', { cause: 404 }));

    return res.status(200).json({
      message: 'Bookings retrieved successfully',
      bookings,
    });
  }
  //update booking

  export async function updateBooking(req, res, next) {
    const { bookingId } = req.params; 
    const { name, email, phone, date, services, message ,time ,employeeName} = req.body;  
    //check if booking exist

    const booking = await BookNow.findById(bookingId);
    if (!booking) return next (new Error('Booking not found', { cause: 404 }));

    //check if date > = today
    if (date) {
      const today = new Date(); 
      const bookingDate = new Date(date);
      if (bookingDate < today || bookingDate == today) {
        return next(new Error('Booking date must be today or in the future', { cause: 400 }));
      } 
    }
    //check if time is valid
    if (time) {
      const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;  
      if (!timeRegex.test(time)) {
        return next(new Error('Invalid time format', { cause: 400 }));
      }

    }

    //check if time is in the future for the given date
    if (date && time) {
      const currentTime = new Date();
      const bookingDateTime = new Date(`${date}T${time}:00`);
      if (bookingDateTime < currentTime) {
        return next(new Error('Booking time must be in the future', { cause: 400 }));
      } 
  } 

  //check employees found 
  const isEmployeeFound = await User.findOne({ name: employeeName, role: 'employee' });
  if (employeeName && !isEmployeeFound) return next (new Error('Employee not found', { cause: 404 }));
  //check if servies is found
  const categories = await Category.find({ _id: { $in: services } });
  if (services && categories.length !== services.length) {
    return next(new Error('One or more services not found', { cause: 404 }));
  }

  const serviceTitles = categories.map(category => category.title);
    booking.name = name || booking.name;
    booking.employeeName = employeeName || booking.employeeName;
    booking.email = email || booking.email;
    booking.phone = phone || booking.phone;
    booking.date = date || booking.date;
    booking.time = time || booking.time;
    booking.services = serviceTitles || booking.services;
    booking.message = message || booking.message;
    booking.isOpened = false; //reset isOpened to false on update
    await booking.save();
    return res.status(200).json({
      message: 'Booking updated successfully',
      booking,
    });
  }
  //get bookings by employee id
  export async function getBookingsByEmployeeId(req, res, next) {
    const { employeeId } = req.params; 
    // check if employee exist
    const isEmployeeExist = await User.findById(employeeId);
    if (!isEmployeeExist) return next (new Error('Employee not found', { cause: 404 }));

    const bookings = await BookNow.find({ employeeId });
    //check if bookings found
    if (bookings.length === 0 || !bookings) return res.status(200).json({
      message: 'No bookings found for this employee Yet',
      bookings: [],
    });
    
    return res.status(200).json({
      message: 'Bookings retrieved successfully',
      bookings,
    });
  }

  //

  //end of file