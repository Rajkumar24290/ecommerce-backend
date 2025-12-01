const router = require("express").Router();
const Product = require("./product.model");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./product.controller");



router.get("/test-create", async (req, res) => {
  try {
    const product = await Product.create({
      name: "Nike Athletic Sneakers",
      description: "Lightweight running shoes.",
      price: 2999,
      stock: 50,
      sku: "NK-32233-01",
      category: "69298d670475627fa2954e13",
      visibility: true,
      seo: {
        metaTitle: "Buy Nike Athletic Sneakers",
        metaDescription: "Best running shoes for all terrains"
      },
      images: ["image1.jpg", "image2.jpg"],
      variants: [
        { name: "Size", options: ["S", "M", "L"] },
        { name: "Color", options: ["Red", "Blue"] }
      ]
    });

    res.json({
      success: true,
      message: "Test product created successfully!",
      product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


router.get("/read/:productUid", async (req, res) => {
  try {
    const product = await Product.findOne({ productUid: req.params.productUid });

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.json({ success: true, product });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});



router.get("/category/:categoryId", async (req, res) => {
  const products = await Product.find({ category: req.params.categoryId });
  res.json({ success: true, products });
});


router.get("/", getProducts);



router.get("/:id", getProduct);


router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
