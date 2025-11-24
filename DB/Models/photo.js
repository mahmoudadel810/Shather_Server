import mongoose, { model, Schema } from "mongoose";

const photoSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: ({ path }) => `${path} is not a valid title!`
    },
    message: ({ path }) => `${path} is not a valid title!`

  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: ({ path }) => `${path} is not a valid description!`
    },
    message: ({ path }) => `${path} is not a valid description!`

  },
   image: {
    type: {
      secure_url: String,
      public_id: String,
    },
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,

  },
  category: {
    type:String,
    trim:true,
    required: true,
  },
},{
    timestamps: true,
});

export const Photo = model('Photo', photoSchema);