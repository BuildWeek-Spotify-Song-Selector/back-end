const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// const userRouter = require("./routes/user/userRouter");
// const songsRouter = require("./routes/songs/songsRouter");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

// server.use("/user", accountsRouter);
// server.use("/songs", musicRouter);

server.use("/", express.static("./index.html"));

module.exports = server;
