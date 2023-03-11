import jwt from 'jsonwebtoken'



const generateToken = (_id) => {
  return jwt.sign({ _id}, "secret", {
    expiresIn: "1d",
  });
};




export default generateToken
