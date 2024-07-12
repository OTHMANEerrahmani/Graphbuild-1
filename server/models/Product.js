import mongoose from "mongoose";

const adsetSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const adAccountSchema = new mongoose.Schema({
  id: String,
  name: String,
  adsets: [adsetSchema],
});

const productSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    prdPrix: String,
    prixVente: {
      type: String,
    },
    picturePath: String,
    callCenter: String,
    country: String,
    senarioData: [adAccountSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
