const r = require("express").Router();
const c = require("./auth.controller");
r.post("/register", c.register);
r.post("/login", c.login);
r.get("/profile", c.profile);
module.exports = r;
