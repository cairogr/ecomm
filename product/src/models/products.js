import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    id: {type: Number},
    name: {type: String, required: true, minLength: 4},
    slug: {type: String},
    unitPrice: {type: Number, min: 1},
    quantityStock: {type: Number, min: 1, max: 10000},
    idCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true},

  }
);

const products= mongoose.model('products', productsSchema);

export default products;