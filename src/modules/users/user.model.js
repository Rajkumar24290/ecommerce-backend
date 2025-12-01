const m = require("mongoose");
module.exports = m.model(
  "User",
  new m.Schema({ name: String, email: String, password: String })
);
