const m = require("mongoose");
module.exports = m.model(
  "Order",
  new m.Schema({ items: Array, total: Number, status: String })
);
