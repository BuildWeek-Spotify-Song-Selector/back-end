const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { restricted } = require("../../auth/restricted-middleware");
const db = require("./userModel.js");

// /user/register
router.post("/register", validateUser, (req, res, logger) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 10);
  db.registerUser(user)
    .then((user) => {
      const token = generateToken(user);
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// /user/login
router.post("/login", validateUser, (req, res) => {
  const { email, password } = req.body;
  db.findByEmail({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.json({
          id: user.id,
          message: `Success, Welcome ${user.name}`,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid username or password." });
      }
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

function validateUser(request, response, next) {
  if (!request.body.email) {
    response.status(404).json({ message: "!: Email missing from body" });
  } else if (!request.body.password) {
    response.status(404).json({ message: "!: Password missing from body" });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
