
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 32,
    trim: true,
    message: 'Name must be between 3 and 32 characters',
    match: [/^[a-zA-Z0-9_]+$/, 'Name must contain only letters, numbers, and underscores'],
    message: 'Name must contain only letters, numbers, and underscores',

  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    message: 'Please fill a valid email address', 

  },
  password: {
    type: String,
    required: true,
    max: 128,
    min: 6,
    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  },
  rePassword: {
    type: String,
    // required: true,
    max: 128,
    min: 6,
    
    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  },
  role: {
    type: String,
    default: 'user',
    message: 'Role must be either user or admin',
    enum: ['user', 'admin', 'employee'],
     required: true,
     message: 'Role is required',


  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]+$/, 'Please fill a valid phone number'],
    message: 'Please fill a valid phone number',
     
  },
  jop:{
    type: String,
    default:'shather Employee',

  },
  profileImage: {
     type: {
      secure_url: String,
      public_id: String,
    },
  },
  rate: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  isVeryfaied: {
    type: Boolean,
    default: false,

  },
  isLoggedIn: {
    type: Boolean,
    default: false,
    
  },
  isActive:{
    type: Boolean,
    default: false,
  }
}, {
    timestamps: true,
});

export const User = model('User', userSchema);
