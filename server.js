const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routes/user/userRouter");
const songsRouter = require("./routes/songs/songsRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/", express.static(__dirname + "/documentation"));

server.use("/api/user", userRouter);
server.use("/api/songs", songsRouter);

module.exports = server;
