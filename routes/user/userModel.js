const db = require("../../database/dbConfig.js");

module.exports = {
  registerUser,
  findById,
  findByEmail,
  deleteUser,
  editUser,
};

function registerUser(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then((ids) => findById(ids[0]));
}

function findById(id) {
  return db("users").where("id", id).first();
}

function findByEmail(email) {
  return db("users").where(email).first();
}

function deleteUser(id) {
  return db("users").where({ id }).del();
}

function editUser(id, userInfo) {
  return db("users").where({ id }).update(userInfo);
}
