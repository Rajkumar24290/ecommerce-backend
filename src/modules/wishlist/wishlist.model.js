const m = require("mongoose");
module.exports = m.model(
  "Wishlist",
  new m.Schema({ userId: String, productId: String })
);
