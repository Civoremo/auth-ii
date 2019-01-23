const db = require("../dbConfig.js");

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};

function registerUser(user) {
  return db("users").insert(user);
}

function loginUser(user) {
  return db("users")
    .where({ username: user.username })
    .first();
}

function getUsers() {
  return db("users").select("id", "username", "department");
}
