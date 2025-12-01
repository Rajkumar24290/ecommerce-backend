const m = require("mongoose");
module.exports = m.model(
  "Page",
  new m.Schema({ slug: String, content: String })
);
