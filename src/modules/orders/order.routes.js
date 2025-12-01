const r = require("express").Router();
const c = require("./order.controller");
r.post("/", c.create);
r.get("/", c.list);
module.exports = r;
