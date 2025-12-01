const r = require("express").Router();
const c = require("./wishlist.controller");
r.get("/", c.list);
module.exports = r;
