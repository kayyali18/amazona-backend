import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    image: { type: "String", required: true },
    price: { type: Number, required: true },
    brand: { type: "String", required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    description: {
      type: String,
      required: true,
      default:
        "High end products for the best price. Thank you for shopping with Amazona",
    },
  },
  { timestamps: true }
);

// Create table basically
const Product = mongoose.model("Product", schema);
export default Product;
