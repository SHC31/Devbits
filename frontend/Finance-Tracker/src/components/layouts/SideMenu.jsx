import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route, label) => {
    if (label === "Logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    clearUser();
    localStorage.clear();
    navigate("/login");
  };
  console.log("SideMenu Rendered");
console.log("User:", user);
console.log("Active Menu:", activeMenu);


  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      {/* ✅ Profile Section */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full transition-transform duration-500 hover:scale-110 hover:rotate-3"
          />
        ) : (
          <CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="text-gray-950 font-medium leading-6">{user?.fullName || ""}</h5>
      </div>

      {/* ✅ Menu Items with Advanced Hover Effects */}
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-300 ease-in-out relative overflow-hidden
            ${
              activeMenu === item.label
                ? "text-white bg-primary"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-indigo-500 shadow-md hover:shadow-lg"
            }
          `}
          onClick={() => handleClick(item.path, item.label)}
        >
          {/* ✅ Animated Icon */}
          <div className="relative">
            <item.icon
              className="text-xl transition-transform duration-300 hover:scale-110 hover:rotate-6"
            />
            {/* ✅ Small glowing effect on hover */}
            <span className="absolute -top-2 -left-2 w-4 h-4 bg-primary/20 rounded-full opacity-0 transition-opacity duration-500 hover:opacity-100"></span>
          </div>

          {/* ✅ Text with a subtle move effect */}
          <span className="transition-transform duration-300 hover:translate-x-1">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
