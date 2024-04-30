import { Schema, Types, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripcion es obligatoria"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
});

ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  delete product.__v;
  return product;
};

export default model("Category", ProductSchema);
