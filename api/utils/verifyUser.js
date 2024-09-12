const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token", token);
  if (!token) {
    return next(errorHandler(401, "unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("err", err);
      return next(errorHandler(401, "unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
