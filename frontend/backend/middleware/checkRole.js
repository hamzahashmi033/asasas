require("dotenv").config();

const checkRole = (req, res, next) => {
  if (res.locals.role != "admin") {
    return res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = { checkRole };