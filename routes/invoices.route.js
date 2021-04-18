const express = require("express");
const router = express.Router();
const {
  deleteInvoice,
  findAll,
  create,
  findOne,
  updateInvoice,
} = require("../controllers/invoice.controller");
router.route("/invoices").get(findAll);
router.route("/invoices/:id").get(findOne);
router.route("/invoices").post(create);
router.route("/invoices/:id").delete(deleteInvoice);
router.route("/invoices/:id").put(updateInvoice);
module.exports = router;
