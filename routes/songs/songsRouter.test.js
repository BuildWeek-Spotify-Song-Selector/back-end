const request = require("supertest");
const express = require("express");
const server = require("../../server");
const db = require("../../database/dbConfig");

require("dotenv").config();
const {
  getSongs,
  getLikedSongs,
  likeSong,
  deleteFromLikes,
  putSongToUser,
} = require("./songsModel.js");

describe("song endpoints", function () {
  const OLD_ENV = process.env;
  beforeEach(async () => {
    await db("users").truncate();
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });
  describe("Songs", () => {
    it("POST: get songs - should return songs", function () {
      return request(server).post("/api/user/register").send({
        name: "AustinTest",
        email: "testemail@gmail.com",
        password: "password123",
      });
      return request(server)
        .post("/api/user/login")
        .send({ email: "testemail@gmail.com", password: "password123" })
        .then((res) => {
          const token = res.body.token;
          let output = res.body;
          let containArrays = true;
          if (output.length) {
            output.forEach((element) => {
              // containArrays is false if one of the element is not an array
              if (Array.isArray(element) === false) containArrays = false;
            });
          }
          return request(server)
            .post("/api/songs/")
            .set("Authorization", token)
            .then((res) => expect(containArrays).toBeTruthy());
        });
    });
    it("POST: get likes - should return status 200", function () {
      return request(server).post("/api/user/register").send({
        name: "AustinTest",
        email: "testemail@gmail.com",
        password: "password123",
      });
      return request(server)
        .post("/api/user/login")
        .send({ email: "testemail@gmail.com", password: "password123" })
        .then((res) => {
          const token = res.body.token;
          return request(server)
            .post("/api/songs/1/likes")
            .set("Authorization", token)
            .then((res) => expect(res.status).toBe(201));
        });
    });
  });
});
