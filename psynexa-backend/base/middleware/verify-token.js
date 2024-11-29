const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY_LOGER, (err, decoded) => {
      if (err) {
        return res.json({
          status: false,
          message: "Failed to authenticate token",
          err: err,
        });
      } else {
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: "No token provided.",
    });
  }
};
