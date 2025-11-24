import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
    unique: true,
    
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    trim: true,
    
  },
  image: {
    type: {
      secure_url: String,
      public_id: String,
    },
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

},{
    timestamps: true,
});

export const Category = model('Category', categorySchema);
