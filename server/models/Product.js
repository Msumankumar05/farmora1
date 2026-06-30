import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ['Fruits','Dairy', 'Vegetables', 'Grains','Beverages','Herbs', 'Organic', 'Exotic'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    unit: {
      type: String,
      default: 'kg',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', productSchema);