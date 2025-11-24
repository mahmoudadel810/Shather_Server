import { model, Schema } from "mongoose";

const menuSchema = new Schema({
  itemNameEN: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  
  itemNameAR: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  itemPriceEN: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  itemPriceAr: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
    timestamps: true,
});
export const Menu = model('Menu', menuSchema);