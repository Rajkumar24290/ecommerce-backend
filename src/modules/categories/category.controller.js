const Category = require("./category.model");


exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      slug: req.body.name.toLowerCase().replace(/ /g, "-")
    });

    res.status(201).json({
      success: true,
      category
    });
  } catch (err) {
    next(err);
  }
};


exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, categories });
  } catch (err) {
    next(err);
  }
};
