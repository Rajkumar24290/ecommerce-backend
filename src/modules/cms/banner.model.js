const m = require("mongoose");
module.exports = m.model(
  "Banner",
  new m.Schema({ image: String, title: String })
);
