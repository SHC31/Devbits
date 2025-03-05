import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-2xl border border-gray-200/50 
      transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      
      {/* ✅ Stylish Icon Container */}
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} 
        rounded-full shadow-md transition-transform duration-300 hover:scale-110`}>
        {icon}
      </div>

      {/* ✅ Text Section */}
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-[22px] font-semibold text-gray-800">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
