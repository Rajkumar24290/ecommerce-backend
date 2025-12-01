const router = require("express").Router();
const Product = require("./product.model");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./product.controller");

router.get("/test-create-simple", async (req, res) => {
  try {
    const product = await Product.create({
      product_id: "simple-0014",
      name: "Basic T-Shirt",
      slug: "basic-t-shirt",
      product_type: "simple",
      category: "692d8b06070569f8ec04ad52", 
      price: {
        regular: 20,
        sale: 15,
        currency: "USD",
      },
      inventory: {
        stock_quantity: 100,
        stock_status: "in_stock",
      },
      images: [
        {
          url: "tshirt.jpg",
          alt_text: "Basic T-Shirt",
          is_primary: true,
        },
      ],
    });

    res.json({
      success: true,
      message: "Simple product created!",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/test-create-variation", async (req, res) => {
  try {
    const product = await Product.create({
      product_id: "variation-001",
      name: "Sneaker Shoes",
      slug: "sneaker-shoes",
      product_type: "variation",
      category: "692d22ffe253cded0d217cc3",
      price: {
        regular: 50,
        currency: "USD",
      },
      variations: [
        {
          variation_id: "var-001",
          sku: "SNK-RED-42",
          attributes: [
            { name: "Color", value: "Red" },
            { name: "Size", value: "42" },
          ],
          price: {
            regular: 55,
            sale: 50,
          },
          inventory: {
            stock_quantity: 10,
            stock_status: "in_stock",
          },
        },
        {
          variation_id: "var-002",
          sku: "SNK-BLU-43",
          attributes: [
            { name: "Color", value: "Blue" },
            { name: "Size", value: "43" },
          ],
          price: {
            regular: 60,
            sale: 55,
          },
          inventory: {
            stock_quantity: 8,
            stock_status: "in_stock",
          },
        },
      ],
      images: [
        {
          url: "sneakers.jpg",
          alt_text: "Sneaker Shoes",
          is_primary: true,
        },
      ],
    });

    res.json({
      success: true,
      message: "Variation product created!",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/test-create-combo", async (req, res) => {
  try {
    const product = await Product.create({
      product_id: "combo-001",
      name: "Coffee Combo Pack",
      slug: "coffee-combo-pack",
      product_type: "combo",
      category: "692d22ffe253cded0d217cc3",
      combo_details: {
        items: [
          { product_id: "coffee-beans", quantity: 1 },
          { product_id: "coffee-mug", quantity: 2 },
        ],
        combo_price: {
          regular: 50,
          sale: 45,
        },
      },
      images: [
        {
          url: "coffee-combo.jpg",
          alt_text: "Coffee Combo Pack",
          is_primary: true,
        },
      ],
    });

    res.json({
      success: true,
      message: "Combo product created!",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/test-create-subscription", async (req, res) => {
  try {
    const product = await Product.create({
      product_id: "subscription-001",
      name: "Monthly Coffee Subscription",
      slug: "monthly-coffee-subscription",
      product_type: "subscription",
      category: "692d22ffe253cded0d217cc3",
      subscription_details: {
        billing_cycle: "monthly",
        billing_interval: 1,
        trial_period_days: 7,
        subscription_price: {
          regular: 30,
          sale: 25,
        },
        auto_renew: true,
      },
      images: [
        {
          url: "coffee-subscription.jpg",
          alt_text: "Coffee Subscription",
          is_primary: true,
        },
      ],
    });

    res.json({
      success: true,
      message: "Subscription product created!",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      product_type: { $exists: true }, // ensures only NEW schema products
    }).populate("category");

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updated,
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
      deleted_product_id: req.params.id,
    });
  } catch (err) {
    next(err);
  }
};

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
