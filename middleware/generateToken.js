const mwConfig = require("../middleware/middlewareConfig.js");
const jwt = mwConfig.jwt;

module.exports = {
  genToken(user) {
    const payload = {
      username: user.username,
      department: user.department,
    };
    const secret = process.env.JWT_SECRET;

    const options = {
      expiresIn: "30m",
    };

    return jwt.sign(payload, secret, options);
  },
};
