const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getAllTransactions = async (req, res) => {
    try {
        console.log("✅ Received Request for Transactions");
        
        // Check if req.user exists
        if (!req.user) {
            console.log("🔴 Authentication Failed: No user found in req.user");
            return res.status(401).json({ message: "User authentication failed" });
        }

        const userId = req.user._id;
        let { search, startDate, endDate } = req.query;

        console.log("✅ User ID:", userId);
        console.log("🔹 Filters - Search:", search, "Start Date:", startDate, "End Date:", endDate);

        // Convert dates to valid Date objects if provided
        let filter = { userId };
        if (startDate) filter.date = { $gte: new Date(startDate) };
        if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };

        // Fetch both income and expenses
        const incomes = await Income.find(filter).sort({ date: -1 });
        const expenses = await Expense.find(filter).sort({ date: -1 });

        console.log(`✅ Fetched ${incomes.length} incomes, ${expenses.length} expenses`);

        // Format transactions for unified structure
        let transactions = [
            ...incomes.map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...expenses.map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest

        console.log("✅ Total Transactions Before Filtering:", transactions.length);

        // Apply search filter (case-insensitive)
        if (search) {
            search = search.toLowerCase();
            transactions = transactions.filter(
                (txn) =>
                    (txn.category && txn.category.toLowerCase().includes(search)) ||
                    (txn.source && txn.source.toLowerCase().includes(search)) ||
                    txn.amount.toString().includes(search)
            );
        }

        console.log("✅ Total Transactions After Search Filter:", transactions.length);

        res.status(200).json(transactions);
    } catch (error) {
        console.error("🔴 Error fetching transactions:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
