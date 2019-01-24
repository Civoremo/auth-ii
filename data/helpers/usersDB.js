const db = require("../dbConfig.js");

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUsersDep,
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

function getUsersDep(departmentString) {
    return db("users")
        .select("id", "username", "department")
        .where({ department: departmentString });
}
