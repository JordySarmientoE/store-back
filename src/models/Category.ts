import { Schema, Types, model } from "mongoose";

const CategorySchema = new Schema({
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
  shop: {
    type: Types.ObjectId,
    ref: "Shop",
  },
});

CategorySchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  return category;
};

export default model("Category", CategorySchema);
