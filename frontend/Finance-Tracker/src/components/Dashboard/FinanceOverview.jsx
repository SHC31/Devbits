import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    console.log("FinanceOverview Props:", { totalBalance, totalIncome, totalExpense });


    const balanceData = [
        { name: "Total Balance", value: totalBalance },
        { name: "Total Expenses", value: totalExpense },
        { name: "Total Income", value: totalIncome },
    ];

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
                <p className='text-gray-600 '>Total Balance:<span className='text-purple-900'> ₹{totalBalance}</span></p>
               
                
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview