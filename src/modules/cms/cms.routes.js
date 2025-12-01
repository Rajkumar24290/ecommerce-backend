const r = require("express").Router();
const c = require("./cms.controller");
r.get("/pages/:slug", c.getPage);
module.exports = r;
