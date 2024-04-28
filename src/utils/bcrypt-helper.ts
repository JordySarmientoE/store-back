import bcrypt from "bcryptjs";

const hashValue = (value: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(value, salt);
};

const hashValidate = (value: string, hashValue: string) => {
  return bcrypt.compareSync(value, hashValue);
};

export { hashValue, hashValidate };
