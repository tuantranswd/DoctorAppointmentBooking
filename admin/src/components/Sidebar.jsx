import { Calendar, Home, PlusSquare, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Component Sidebar hiển thị thanh bên với menu điều hướng
  // Danh sách menu
  const menuItems = [
    { icon: <Home size={20} />, name: "Bảng điều khiển", path: "/dashboard" },
    { icon: <Calendar size={20} />, name: "Lịch hẹn", path: "/appointments" },
    {
      icon: <PlusSquare size={20} />,
      name: "Thêm bác sĩ",
      path: "/add-doctor",
    },
    { icon: <Users size={20} />, name: "Danh sách bác sĩ", path: "/doctors" },
  ];

  // Render danh sách menu với trạng thái active
  return (
    <div className="flex flex-col bg-white py-4 border-gray-200 border-r w-64 min-h-screen">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.name}>
              <Link
                className={`
                  flex items-center gap-3 px-6 py-3 cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]"
                      : "hover:bg-gray-50"
                  }
                `}
                to={item.path}
              >
                <span className={isActive ? "text-[#5F6FFF]" : "text-gray-600"}>
                  {item.icon}
                </span>
                <span
                  className={`text-sm font-medium ${isActive ? "text-black" : "text-gray-600"}`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
