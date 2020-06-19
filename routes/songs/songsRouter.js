const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { restricted } = require("../../auth/restricted-middleware");

const db = require("./songsModel.js");

module.exports = router;

router.get("/", restricted, (req, res) => {
  db.getSongs()
    .then((songs) => {
      res.json(songs);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The songs could not be retrieved.",
      });
    });
});
