const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routes/user/userRouter");
const songsRouter = require("./routes/songs/songsRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/", logger, express.static(__dirname + "/documentation"));

server.use("/api/user", logger, userRouter);
server.use("/api/songs", logger, songsRouter);

function logger(req, res, next) {
  const today = new Date().toISOString(); // YYYY-MM-DD
  console.log(`[${today}] ${req.method} to ${req.originalUrl}`);

  next();
}

module.exports = server;
