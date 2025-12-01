const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  regular: { type: Number, required: true },
  sale: { type: Number },
  currency: { type: String, default: "INR" },
});

const inventorySchema = new mongoose.Schema({
  stock_quantity: { type: Number, default: 0 },
  stock_status: {
    type: String,
    enum: ["in_stock", "out_of_stock"],
    default: "in_stock",
  },
});

const subscriptionSchema = new mongoose.Schema({
  billing_cycle: String,
  billing_interval: Number,
  trial_period_days: Number,
  subscription_price: priceSchema,
  auto_renew: Boolean,
});

const comboSchema = new mongoose.Schema({
  items: [
    {
      product_id: String,
      quantity: Number,
    },
  ],
  combo_price: priceSchema,
});

const variationSchema = new mongoose.Schema({
  variation_id: String,
  sku: String,
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  price: priceSchema,
  inventory: inventorySchema,
});

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    product_type: {
      type: String,
      enum: ["simple", "variation", "combo", "subscription"],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price: priceSchema,
    inventory: inventorySchema,

    variations: [variationSchema],

    combo_details: comboSchema,

    subscription_details: subscriptionSchema,

    images: [
      {
        url: String,
        alt_text: String,
        is_primary: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
