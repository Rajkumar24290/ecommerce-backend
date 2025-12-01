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
      product_type,
      minPrice,
      maxPrice,
      stock_status,
      sort = "-createdAt",
      page = 1,
      limit = 20,
    } = req.query;

    // FORCE ONLY NEW SCHEMA PRODUCTS
    const query = { product_id: { $exists: true } };

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { slug: new RegExp(search, "i") },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (product_type) {
      query.product_type = product_type;
    }

    if (minPrice || maxPrice) {
      query["price.regular"] = {};
      if (minPrice) query["price.regular"].$gte = Number(minPrice);
      if (maxPrice) query["price.regular"].$lte = Number(maxPrice);
    }

    if (stock_status) {
      query["inventory.stock_status"] = stock_status;
    }

    console.log("FINAL QUERY:", query);

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
    const product = await Product.findById(req.params.id).populate("category"); // 🔹 include category

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
    }).populate("category"); // optional, but nice to have updated category too

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
