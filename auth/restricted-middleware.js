const jwt = require("jsonwebtoken");

module.exports = {
  restricted,
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Incorrect Token... " });
        console.log(err);
      } else {
        req.user = { id: decodedToken.id, email: decodedToken.email };
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "User not logged in, please log in and try again." });
  }
}
