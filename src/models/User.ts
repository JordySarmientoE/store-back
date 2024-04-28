import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  lastname: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  phone: {
    type: Number,
    required: [true, "El telefono es obligatorio"],
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

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  return user;
};

export default model("User", UserSchema);
