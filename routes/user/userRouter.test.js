const request = require("supertest");
const express = require("express");
const server = require("../../server");
const db = require("../../database/dbConfig");

require("dotenv").config();

describe("user endpoints", function () {
  const OLD_ENV = process.env;
  beforeEach(async () => {
    await db("users").truncate();
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  describe("Registration", () => {
    it("should give back the created user name", function () {
      return request(server)
        .post("/api/user/register")
        .send({
          name: "AustinTest",
          email: "testemail@gmail.com",
          password: "password123",
        })
        .then((res) => {
          expect(res.body.name).toBe("AustinTest");
        });
    });

    it("should return status 201", function () {
      return request(server)
        .post("/api/user/register")
        .send({
          name: "AustinTest",
          email: "testemail@gmail.com",
          password: "password123",
        })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("Login", () => {
    let data = {
      email: "testemail@gmail.com",
      password: "password123",
    };
    it("should give back the user name", function () {
      return request(server).post("/api/user/register").send({
        name: "AustinTest",
        email: "testemail@gmail.com",
        password: "password123",
      });
      return request(server)
        .post("/api/user/login")
        .set("Accept", "application/json")
        .send(data)
        .then((res) =>
          expect(res.body.message).toBe(`Success, Welcome AustinTest`)
        );
    });
    it("return status 200", () => {
      return request(server).post("/api/user/register").send({
        name: "AustinTest",
        email: "testemail@gmail.com",
        password: "password123",
      });
      return request(server)
        .post("/api/user/login")
        .set("Accept", "application/json")
        .send(data)
        .then((res) => expect(res.status).toBe(200));
    });
    it("should return token on login", function () {
      let token;
      return request(server).post("/api/user/register").send({
        name: "AustinTest",
        email: "testemail@gmail.com",
        password: "password123",
      });
      return request(server)
        .post("/api/user/login")
        .send({
          username: "testemail@gmail.com",
          password: "password123",
        })
        .then((res) => expect(res.body).arrayContaining(token));
    });
  });
});
