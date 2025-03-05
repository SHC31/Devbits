import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    console.log("Component mounted, calling fetchTransactions...");
    if (!hasFetched.current) {
      hasFetched.current = true;
    fetchTransactions(); // Fetch all transactions on initial load
  }
}, []);

  const fetchTransactions = async () => {
    console.log("Fetching transactions...");
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Redirecting to login.");
      return; // Prevents API call if token is missing
    }

    try {
      console.log("Making API request to fetch transactions with params:", { search, startDate, endDate });

      const response = await axios.get(
        "http://localhost:8000/api/v1/transaction",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { search, startDate, endDate },
        }
      );

      console.log("API Response:", response.data);
      setTransactions(response.data || []);
      console.log("Updated transactions state:", transactions); // Ensures transactions is always an array
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    console.log("Component mounted, calling fetchTransactions...");
    fetchTransactions();
  }, []); // Runs only on mount

  const clearFilters = () => {
    console.log("Clearing filters...");
    setSearch("");
    setStartDate("");
    setEndDate("");
    fetchTransactions();
  };

  return (
    <div>
       {transactions.length === 0 ? (
      <p>Loading transactions...</p>
    ) : (
      <DashboardLayout activeMenu="Transactions">
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Transactions</h2>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search transactions..."
              className="border p-3 rounded w-full focus:ring focus:ring-indigo-300 pr-10 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <XCircleIcon
                className="h-5 w-5 text-gray-500 absolute right-3 top-3 cursor-pointer"
                onClick={clearFilters}
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <label className="text-gray-700">From:</label>
              <input
                type="date"
                className="border p-3 rounded w-full focus:ring focus:ring-indigo-300 shadow-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <label className="text-gray-700">To:</label>
              <input
                type="date"
                className="border p-3 rounded w-full focus:ring focus:ring-indigo-300 shadow-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  console.log("Search button clicked.");
                  fetchTransactions();
                }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-500 transition-all"
              >
                Search
              </button>
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
          <table className="w-full text-gray-800">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-4 text-left">Transaction</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn._id} className="border-b hover:bg-gray-100 transition-all group">
                    <td className="p-4 flex items-center gap-2">
                      {txn.icon && <img src={txn.icon} alt="icon" className="w-6 h-6" />} 
                      <span className="text-sm font-medium text-gray-700">{txn.category || txn.source}</span>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${txn.type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"}`}>
                        <h6 className='text-xs font-medium'>
                          {txn.type === "income" ? "+" : "-"} ₹{txn.amount}
                        </h6>
                        {txn.type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className={`p-4 font-semibold ${txn.type === "income" ? "text-green-500" : "text-red-500"}`}>
                      {txn.type}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-600">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )}
    </div>
          
  );
};

export default TransactionsPage;
