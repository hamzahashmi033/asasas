require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  

  if (authHeader == null) {
    return res.sendStatus(401);
  } else {
    jwt.verify(authHeader, process.env.SECRET, (err, response) => {
      if (err) {
        return res.sendStatus(403);
      }
     
      res.locals = response;
      next();
    });
  }
};

module.exports = { authenticate };