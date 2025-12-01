const router = require("express").Router();
const { createCategory, getCategories } = require("./category.controller");

router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
