const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.body.token;

  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("youare not authenticated");
  }
}

module.exports = verify;
