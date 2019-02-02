const server = require("./api/server.js");
const PORT = process.env.PORT || 3600;

server.listen(PORT, function() {
  console.log(`\nServer Listening On Port ${PORT}\n`);
});
