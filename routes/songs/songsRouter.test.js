const request = require("supertest");
const express = require("express");
const server = require("../../server");
const db = require("../../database/dbConfig");

const {
  getSongs,
  getLikedSongs,
  likeSong,
  deleteFromLikes,
  putSongToUser,
} = require("./songsModel.js");

describe("song endpoints", () => {
  describe("Songs", () => {
    it("POST: get songs - should return songs", async () => {
      return await request(server);
      request(server)
        .post("/api/user/login")
        .send({ email: "user1@gmail.com", password: "testpwd" })
        .then((res) => {
          const token = res.body.token;
          return request(server)
            .post("/api/songs/")
            .set("Authorization", token)
            .then((res) => expect(res.body).arrayContaining({}));
        });
    });
    it("POST: get likes - should return status 200", async () => {
      return await request(server);
      request(server)
        .post("/api/user/logi")
        .send({ email: "user1@gmail.com", password: "testpwd" })
        .then((res) => {
          const token = res.body.token;

          return request(server)
            .post("/api/songs/1/likes")
            .set("Authorization", token)
            .then((res) => expect(res.body.data[0].user_id).toBe(2));
        });
    });
  });
});
