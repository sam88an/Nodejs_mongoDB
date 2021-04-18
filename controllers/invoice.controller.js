const Invoice = require("../models/invoice.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const HttpStatus = require("http-status-codes");
exports.findAll = async (req, res, next) => {
  const resPerPage = 8;
  const productCount = await Invoice.countDocuments();
  const invoices = await Invoice.find();
  setTimeout(() => {
    res.status(200).json({
      count: invoices.length,
      productCount,
      invoices,
    });
  }, 2000);
};
exports.create = async (req, res, next) => {
  const { item, quantity, date, tax, due, rate } = req.body;
  if (!item) {
    return res.status(400).json({ error: "Item required field..." });
  }
  if (!quantity) {
    return res.status(400).json({ error: "Quantity required field..." });
  }
  Invoice.create({ item, quantity, date, due, tax, rate })
    .then((invoice) => {
      res.json(invoice);
    })
    .catch((err) => res.status(500).json(err));
};
exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  Invoice.findById(id)
    .then((invoice) => {
      if (!invoice) {
        return res.status(400).json({ err: " Invoices could not found..." });
      } else {
        return res.json(invoice);
      }
    })
    .catch((err) => res.status(500).json(err));
};
exports.deleteInvoice = async (req, res, next) => {
  const { id } = req.params;
  Invoice.findByIdAndRemove(id)
    .then((invoice) => {
      if (!invoice) {
        return res.status(400).json({ err: " Could delete any invoice..." });
      } else {
        return res.json({ msg: "Delete success ....." });
      }
    })
    .catch((err) => res.status(500).json(err));
};
exports.updateInvoice = catchAsyncErrors(async (req, res, next) => {
  let product = await Invoice.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    product = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        item: req.body.item,
        quantity: req.body.quantity,
        date: req.body.date,
        due: req.body.due,
        tax: req.body.tax,
        rate: req.body.rate,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      product,
    });
  }
});
// exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
//   let product = await Product.findById(req.params.id);
//   if (!product) {
//     return next(new ErrorHandler("Product not found", 404));
//   } else {
//     product = await Product.findByIdAndUpdate(req.params.id, req.params.body, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   }
// });
