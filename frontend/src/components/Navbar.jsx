import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";
import { useAppContext } from "../context/useAppContext";

const Navbar = () => {
  // Sử dụng Context để lấy token và userData
  const { token, userData, logoutUser } = useAppContext();
  // State quản lý hiển thị menu trên thiết bị di động
  const [showMenu, setShowMenu] = useState(false);
  // Hook điều hướng trang
  const navigate = useNavigate();

  // Danh sách các liên kết điều hướng trong navbar
  const navLinks = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "TẤT CẢ BÁC SĨ", path: "/doctors" },
    { name: "VỀ CHÚNG TÔI", path: "/about" },
    { name: "LIÊN HỆ", path: "/contact" },
  ];

  return (
    // Container chính của navbar với các style: căn đều, padding, border-bottom
    <div className="flex justify-between items-center mb-5 py-4 border-b border-b-[#ADADAD] text-sm">
      {/* Nút logo - click để về trang chủ */}
      <button
        aria-label="về trang chủ"
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <img alt="logo" src={assets.logo} />
      </button>

      {/* Danh sách liên kết điều hướng - ẩn trên mobile */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {navLinks.map((link) => (
          <NavLink
            // Áp dụng class 'active' khi route hiện tại khớp với đường dẫn của link
            className={({ isActive }) => (isActive ? "active" : "")}
            key={link.name}
            to={link.path}
          >
            {/* Tên menu */}
            <li className="py-1">{link.name}</li>
            {/* Đường gạch chân - hiện khi menu active */}
            <hr className="hidden bg-primary m-auto border-none outline-none w-3/5 h-0.5" />
          </NavLink>
        ))}
      </ul>

      {/* Khu vực bên phải: nút đăng nhập hoặc profile dropdown + menu mobile */}
      <div className="flex items-center gap-4">
        {/* Nếu đã đăng nhập - hiển thị avatar và dropdown menu */}
        {token ? (
          <div className="group relative flex items-center gap-2 cursor-pointer">
            {/* Ảnh đại diện người dùng */}
            <img
              alt="ảnh đại diện"
              className="rounded-full w-8"
              src={userData?.image || assets.profile_pic}
            />
            {/* Icon mũi tên dropdown */}
            <img alt="dropdown" className="w-2.5" src={assets.dropdown_icon} />
            {/* Dropdown menu - hiện khi hover vào avatar */}
            <div className="hidden group-hover:block top-0 right-0 z-20 absolute pt-14">
              <div className="flex flex-col gap-2 bg-white shadow-lg p-3 border border-gray-200 rounded-lg min-w-48">
                {/* Tùy chọn: Xem hồ sơ cá nhân */}
                <button
                  className="hover:text-primary text-left cursor-pointer"
                  onClick={() => navigate("/my-profile")}
                  type="button"
                >
                  Hồ sơ của tôi
                </button>
                {/* Tùy chọn: Xem danh sách lịch hẹn */}
                <button
                  className="hover:text-primary text-left cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                  type="button"
                >
                  Lịch hẹn của tôi
                </button>
                {/* Tùy chọn: Đăng xuất - gọi hàm logoutUser từ Context */}
                <button
                  className="hover:text-primary text-left cursor-pointer"
                  onClick={() => {
                    logoutUser();
                    toast.success("Đã đăng xuất thành công");
                  }}
                  type="button"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Nếu chưa đăng nhập - hiển thị nút tạo tài khoản
          <button
            className="hidden md:block bg-primary px-8 py-3 rounded-full font-light text-white cursor-pointer"
            onClick={() => navigate("/login")}
            type="button"
          >
            Tạo tài khoản
          </button>
        )}

        {/* Nút hamburger menu - chỉ hiện trên mobile */}
        <button
          aria-label="menu"
          className="md:hidden w-6 cursor-pointer"
          onClick={() => setShowMenu(true)}
          type="button"
        >
          <img alt="menu" src={assets.menu_icon} />
        </button>

        {/* Menu mobile - hiển thị dựa trên state showMenu */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          {/* Header của menu mobile với logo và nút đóng */}
          <div className="flex justify-between items-center px-5 py-6">
            <img alt="logo" className="w-36" src={assets.logo} />
            <button
              aria-label="đóng menu"
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              type="button"
            >
              <img alt="đóng" src={assets.cross_icon} />
            </button>
          </div>
          {/* Danh sách liên kết điều hướng trong menu mobile */}
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 font-medium text-lg">
            {navLinks.map((link) => (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                key={link.name}
                onClick={() => setShowMenu(false)}
                to={link.path}
              >
                <p className="inline-block px-4 py-2 rounded-full">
                  {link.name}
                </p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
