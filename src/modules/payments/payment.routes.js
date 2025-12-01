const r = require("express").Router();
const c = require("./payment.controller");
r.post("/checkout", c.checkout);
module.exports = r;
