const express = require("express");
const{
      addIncome,
      getAllIncome,
      deleteIncome,
      downloadIncomeCSV
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/income_details.csv", protect, downloadIncomeCSV );
router.delete("/:id", protect, deleteIncome);

module.exports = router;
