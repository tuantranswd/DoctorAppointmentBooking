import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets.js";
import { useAdminContext } from "../context/AdminContext.jsx";

const Navbar = () => {
  // Component Navbar hiển thị thanh điều hướng trên cùng với logo và nút đăng xuất
  const { removeToken } = useAdminContext();
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 border-gray-200 border-b">
      {/* Phần Logo */}
      <div className="flex items-center gap-2">
        {/* Giả lập logo bằng text/icon, bạn có thể thay bằng thẻ <img> */}
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="w-8 md:w-10 h-8 md:h-10" /> {/* Placeholder cho Logo */}
          <span className="font-bold text-slate-800 text-xl">
            <img alt="" src={assets.admin_logo} />
          </span>
        </div>

        <span className="mt-1 px-2 py-0.5 border border-gray-300 rounded-full text-gray-600 text-xs">
          Quản trị
        </span>
      </div>

      {/* Nút Đăng xuất */}
      <button
        className="bg-[#5F6FFF] hover:bg-[#4b5bea] px-6 py-2 rounded-full font-medium text-white text-sm transition-colors"
        onClick={handleLogout}
        type="button"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Navbar;
