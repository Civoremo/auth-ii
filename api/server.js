require("dotenv").config();
const mwConfig = require("../middleware/middlewareConfig.js");
const db = require("../data/dbConfig.js");
const gT = require("../middleware/generateToken.js");

const userDB = require("../data/helpers/usersDB.js");

const server = mwConfig.express();
const bcrypt = mwConfig.bcrypt;
const jwt = mwConfig.jwt;
const generateToken = gT.generateToken;

server.use(mwConfig.express.json());
server.use(mwConfig.helmet());
server.use(mwConfig.morgan("short"));
server.use(mwConfig.cors());

server.post("/api/users", (req, res) => {
  const creds = req.body;
  const hashedPassword = bcrypt.hashSync(creds.password, 14);
  creds.password = hashedPassword;

  userDB
    .registerUser(creds)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/", (req, res) => {
  res.send("sanity check");
});

module.exports = server;
