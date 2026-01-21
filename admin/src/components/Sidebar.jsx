import { Calendar, Home, PlusSquare, Users } from "lucide-react";

const Sidebar = () => {
  // Component Sidebar hiển thị thanh bên với menu điều hướng
  // Danh sách menu
  const menuItems = [
    { active: true, icon: <Home size={20} />, name: "Bảng điều khiển" }, // Đang active theo mẫu
    { active: false, icon: <Calendar size={20} />, name: "Lịch hẹn" },
    { active: false, icon: <PlusSquare size={20} />, name: "Thêm bác sĩ" },
    { active: false, icon: <Users size={20} />, name: "Danh sách bác sĩ" },
  ];

  // Render danh sách menu với trạng thái active
  return (
    <div className="flex flex-col bg-white py-4 border-gray-200 border-r w-64 min-h-screen">
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li
            className={`
              flex items-center gap-3 px-6 py-3 cursor-pointer transition-all
              ${
                item.active
                  ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]"
                  : "hover:bg-gray-50"
              }
            `}
            key={item.name}
          >
            <span className={item.active ? "text-[#5F6FFF]" : "text-gray-600"}>
              {item.icon}
            </span>
            <span
              className={`text-sm font-medium ${item.active ? "text-black" : "text-gray-600"}`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
