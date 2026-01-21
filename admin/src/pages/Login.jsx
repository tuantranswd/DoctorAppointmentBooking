import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminContext } from "../context/AdminContext.jsx";

/**
 * Component trang đăng nhập Admin
 * Bao gồm form đăng nhập với Email và Mật khẩu
 * Xử lý logic đăng nhập và lưu JWT token vào localStorage
 */
function Login() {
  const navigate = useNavigate();
  const { loginAdmin, isAuthenticated } = useAdminContext();

  // State quản lý dữ liệu form đăng nhập
  const [formData, setFormData] = useState({
    email: "admin@prescripto.com",
    password: "Admin@123",
  });

  // State quản lý trạng thái đang tải khi xử lý đăng nhập
  const [isLoading, setIsLoading] = useState(false);

  // Nếu đã xác thực, chuyển hướng đến bảng điều khiển
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  /**
   * Xử lý thay đổi giá trị đầu vào trong form
   * @param {Event} e - Đối tượng sự kiện từ input
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Xử lý gửi form đăng nhập
   * Gọi API đăng nhập và lưu token vào localStorage nếu thành công
   * @param {Event} e - Đối tượng sự kiện từ form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Gọi API đăng nhập từ AdminContext
      const result = await loginAdmin(formData.email, formData.password);

      if (result.success) {
        // Hiển thị thông báo thành công
        toast.success(result.message || "Đăng nhập thành công");
        // Chuyển hướng đến trang bảng điều khiển
        navigate("/dashboard");
      } else {
        // Hiển thị thông báo lỗi
        toast.error(result.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      // Xử lý lỗi không mong đợi
      console.error("Lỗi khi đăng nhập:", error);
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex items-center min-h-[80vh]" onSubmit={handleSubmit}>
      <div className="flex flex-col items-start gap-3 shadow-lg m-auto p-8 border rounded-xl min-w-[340px] sm:min-w-96 text-[#5E5E5E] text-sm">
        {/* Tiêu đề trang đăng nhập */}
        <p className="m-auto font-semibold text-2xl">
          <span className="text-blue-600">Admin</span> Đăng nhập
        </p>

        {/* Trường nhập Email */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="mt-1 p-2 border border-[#DADADA] rounded w-full"
            disabled={isLoading}
            name="email"
            onChange={handleChange}
            placeholder="Nhập email của bạn"
            required
            type="email"
            value={formData.email}
          />
        </div>

        {/* Trường nhập Mật khẩu */}
        <div className="w-full">
          <p>Mật khẩu</p>
          <input
            className="mt-1 p-2 border border-[#DADADA] rounded w-full"
            disabled={isLoading}
            name="password"
            onChange={handleChange}
            placeholder="Nhập mật khẩu của bạn"
            required
            type="password"
            value={formData.password}
          />
        </div>

        {/* Nút đăng nhập */}
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-2 rounded-md w-full text-white text-base transition-colors disabled:cursor-not-allowed"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Liên kết chuyển đến trang đăng nhập Bác sĩ */}
        <p className="w-full text-center">
          Đăng nhập Bác sĩ?{" "}
          <button
            className="bg-transparent p-0 border-none text-blue-600 hover:text-blue-700 underline cursor-pointer"
            onClick={() => navigate("/doctor/login")}
            type="button"
          >
            Nhấn vào đây
          </button>
        </p>
      </div>
    </form>
  );
}

export default Login;
