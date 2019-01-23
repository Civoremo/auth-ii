require("dotenv").config();
const mwConfig = require("../middleware/middlewareConfig.js");
const db = require("../data/dbConfig.js");
const gT = require("../middleware/generateToken.js");

const userDB = require("../data/helpers/usersDB.js");

const server = mwConfig.express();
const bcrypt = mwConfig.bcrypt;
const jwt = mwConfig.jwt;
const generateToken = gT.genToken;

server.use(mwConfig.express.json());
server.use(mwConfig.helmet());
server.use(mwConfig.morgan("short"));
server.use(mwConfig.cors());

// register user
server.post("/api/register", (req, res) => {
  const creds = req.body;
  const hashedPassword = bcrypt.hashSync(creds.password, 14);
  creds.password = hashedPassword;

  console.log(creds);

  userDB
    .registerUser(creds)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// login user
server.post("/api/login", (req, res) => {
  const creds = req.body;

  userDB
    .loginUser(creds)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          id: user.id,
          username: user.username,
          department: user.department,
          token,
        });
      } else {
        res.status(401).json({ message: "you shall not pass!" });
      }
    })
    .catch();
});

// get users
server.get("/api/users", (req, res) => {
  userDB
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// sanity check
server.get("/", (req, res) => {
  res.send("sanity check");
});

module.exports = server;
