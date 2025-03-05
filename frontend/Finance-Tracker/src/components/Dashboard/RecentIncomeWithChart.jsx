import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);
    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            value: item?.amount,
        }));

        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
                <p className='text-gray-600'>Total Income: <span className='text-purple-900'>₹{totalIncome}</span></p>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`₹${totalIncome}`}
                colors={COLORS}
                showTextAnchor={true}
            />
        </div>
    )
}

export default RecentIncomeWithChart