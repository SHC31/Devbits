//const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const fastCsv = require("fast-csv");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user._id;

    try{
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    }  catch(error) {
        res.status(500).json({ message: "Server Error" });
    }
}

// Get All Income Source
exports.getAllIncome = async (req, res) =>  {
    const userId = req.user._id;

    try{
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch(error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete Income Source
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
} catch(error) {
    res.status(500).json({ message: "Server Error" });
}
};

exports.downloadIncomeCSV = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        if (!incomes.length) {
            return res.status(404).json({ message: "No income data found" });
        }

        const filePath = path.resolve("income_details.csv");

        const ws = fs.createWriteStream(filePath);
        fastCsv
            .write(incomes.map(item => ({
                Source: item.source,
                Amount: item.amount,
                Date: item.date
            })), { headers: true })
            .pipe(ws)
            .on("finish", () => {
                res.setHeader("Content-Type", "text/csv");  // 🛠️ Fix MIME Type
                res.setHeader("Content-Disposition", 'attachment; filename="income_details.csv"');
                
                res.download(filePath, "income_details.csv", (err) => {
                    if (err) console.error("Download error:", err);
                    fs.unlinkSync(filePath); // Delete file after download
                });
            });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};