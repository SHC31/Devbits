const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const { getAllTransactions } = require("../controllers/transactionController");
const router = express.Router();

router.get("/", protect, getAllTransactions);

module.exports = router;
