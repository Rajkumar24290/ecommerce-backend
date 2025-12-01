const mongoose = require("mongoose");
const Counter = require("../../models/counter.model");


const generateUID = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();



const variantSchema = new mongoose.Schema({
  variantId: { type: Number, unique: true },       
  variantUid: { type: String, unique: true },     
  name: { type: String, required: true },          
  options: [{ type: String, required: true }]     
});


variantSchema.pre("save", async function (next) {
  if (!this.variantId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Variant" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.variantId = counter.count;
  }

  if (!this.variantUid) {
    this.variantUid = generateUID();  
  }

  next();
});



const productSchema = new mongoose.Schema(
  {
    
    productId: { type: Number, unique: true },

    productUid: { type: String, unique: true },

    name: { type: String, required: true, trim: true },

    description: { type: String },

    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    sku: { type: String },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },


    images: [{ type: String }],  

    visibility: { type: Boolean, default: true },

    seo: {
      metaTitle: String,
      metaDescription: String,
    },

    variants: [variantSchema],

    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);



productSchema.pre("save", async function (next) {
  // Auto-increment productId
  if (!this.productId) {
    const counter = await Counter.findOneAndUpdate(
      { model: "Product" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
    this.productId = counter.count;
  }


  if (!this.productUid) {
    this.productUid = generateUID();   
  }

  next();
});



module.exports = mongoose.model("Product", productSchema);
