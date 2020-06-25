const request = require("supertest");
const express = require("express");
const server = require("../../server");
const db = require("../../database/dbConfig");

const {
  registerUser,
  findById,
  findByEmail,
  deleteUser,
  editUser,
} = require("./userModel.js");

describe("user endpoints", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("Registration", () => {
    it("should give back the created user name", async () => {
      return await request(server);
      request(server)
        .post("/api/user/register")
        .send({
          name: "AustinTest",
          email: "testemail@gmail.com",
          password: "password123",
        })
        .then((res) => {
          expect(res.body.name).toBe(name);
        })
        .catch((err) => {
          console.log("Secondary error during teardown.");
        });

      it("should return status 201", async () => {
        return await request(server);
        request(server)
          .post("/api/user/register")
          .send({
            name: "AustinTest1",
            email: "testemail@gmail.com",
            password: "password123",
          })
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toBe(201);
            done();
          });
      });
    });
  });

  describe("Login", () => {
    let data = {
      email: "testemail@gmail.com",
      password: "password123",
    };
    it("should give back the user name", async () => {
      return await request(server);
      request(server)
        .post("/api/user/login")
        .set("Accept", "application/json")
        .send(data)
        .then((res) =>
          expect(res.body.message).toBe(`Success, Welcome AustinTest`)
        );
    });
    it("return status 200", async () => {
      return await request(server);
      request(server)
        .post("/api/user/login")
        .set("Accept", "application/json")
        .send(data)
        .then((res) => expect(res.status).toBe(200));
    });
    it("should return token on login", async () => {
      return await request(server);
      let token;
      request(server)
        .post("/api/user/login")
        .send({
          username: "user1@gmail.com",
          password: "testpwd",
        })
        .then((res) => expect(res.body).arrayContaining(token));
    });
  });
});
