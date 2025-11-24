import { model, Schema } from "mongoose";

const bookNowSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  services: {
    type: [String],
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true,
});
export const BookNow = model('BookNow', bookNowSchema);