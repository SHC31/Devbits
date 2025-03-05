//const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const fastCsv = require("fast-csv");
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
} catch(error) {
    res.status(500).json({ message: "Server Error" });
}
};

exports.downloadExpenseCSV = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        if (!expenses.length) {
            return res.status(404).json({ message: "No expense data found" });
        }

        const filePath = path.resolve("expense_details.csv");
        const ws = fs.createWriteStream(filePath);
        fastCsv
            .write(expenses.map(item => ({
                Category: item.category,
                Amount: item.amount,
                Date: item.date
            })), { headers: true })
            .pipe(ws)
            .on("finish", () => {
                res.setHeader("Content-Type", "text/csv");
                res.setHeader("Content-Disposition", 'attachment; filename="expense_details.csv"');
                
                res.download(filePath, "expense_details.csv", (err) => {
                    if (err) console.error("Download error:", err);
                    fs.unlinkSync(filePath); // Delete file after download
                });
            });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};