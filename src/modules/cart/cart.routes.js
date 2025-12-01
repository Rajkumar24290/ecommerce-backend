const r = require("express").Router();
const c = require("./cart.controller");
r.post("/add", c.add);
r.get("/", c.get);
module.exports = r;
