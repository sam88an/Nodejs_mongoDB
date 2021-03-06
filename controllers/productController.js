const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
// Create new product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// Get all Products => /api/v1/products?keyword =apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;
  setTimeout(() => {
    res.status(200).json({
      success: true,
      count: products.length,
      productCount,
      products,
    });
  }, 2000);
});
// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(new ErrorHandler("ProductID not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    product = await Product.findByIdAndUpdate(req.params.id, req.params.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  }
});
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.send({
      success: false,
      message: "Product not found...",
    });
  } else {
    await product.remove();
    res.status(200).json({
      success: true,
      message: "Product delete...",
    });
  }
});
