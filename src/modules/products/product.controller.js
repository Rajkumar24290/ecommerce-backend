const Product = require("./product.model");

exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      status,
      visibility,
      sort = "-createdAt",
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },

        { description: new RegExp(search, "i") },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (status) {
      query.status = status;
    }

    if (visibility !== undefined) {
      query.visibility = visibility === "true";
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate("category");

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      limit: Number(limit),
      products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
