const r = require("express").Router();
const c = require("./user.controller");
r.get("/", c.list);
module.exports = r;
