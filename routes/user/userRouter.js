const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { restricted } = require("../../auth/restricted-middleware");
const db = require("./userModel.js");

// register
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
// login
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
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

//edit user info
router.put("/:id", restricted, (req, res) => {
  const id = req.params.id;
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = bcrypt.hashSync(req.body.password, 10);
  if (id) {
    db.editUser(id, userName, userEmail, userPassword)
      .then((user) =>
        res.status(200).json({ message: "Successfully updated user info" })
      )
      .catch((err) => console.log(err));
  } else {
    return res.status(403).json({
      message: "Please log in to edit user info",
    });
  }
});

// delete user
router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id;
  if (id == req.user.id) {
    db.deleteUser(id)
      .then(() => res.json({ message: "User has been deleted" }))
      .catch((err) => console.log(err));
  } else {
    return res.status(403).json({
      message: "Please log in to delete your account.",
    });
  }
});

// middlewares
function validateUser(request, response, next) {
  if (!request.body.email) {
    response.status(404).json({ message: "Email missing from body" });
  } else if (!request.body.password) {
    response.status(404).json({ message: "Password missing from body" });
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
