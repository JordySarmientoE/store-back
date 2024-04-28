import { Schema, model } from "mongoose";

const ShopSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  address: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  phone: {
    type: Number,
    required: [true, "El telefono es obligatorio"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

ShopSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  return user;
};

export default model("Shop", ShopSchema);
