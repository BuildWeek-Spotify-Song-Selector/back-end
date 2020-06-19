const db = require("../../database/dbConfig.js");

module.exports = {
  registerUser,
  findById,
  findByEmail,
  deleteUser,
  editUser,
};

function registerUser(account) {
  return db("users")
    .insert(account)
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

function editUser(id, accountInfo) {
  return db("users").where({ id }).update(accountInfo);
}
