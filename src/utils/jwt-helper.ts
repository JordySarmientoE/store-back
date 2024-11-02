import jwt from "jsonwebtoken";

const generateJWT = (id: number, shopId: number) => {
  return new Promise((resolve, reject) => {
    const payload = { id, shopId };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY!,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generateJWT;
