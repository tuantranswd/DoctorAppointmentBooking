import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/useAppContext";

/**
 * Component Login - Trang đăng nhập và đăng ký
 * Cho phép người dùng chuyển đổi giữa chế độ đăng nhập và đăng ký
 */
const Login = () => {
  const navigate = useNavigate();
  const { signupUser, loginUser } = useAppContext();

  // State quản lý chế độ hiện tại: "Sign Up" (Đăng ký) hoặc "Login" (Đăng nhập)
  const [state, setState] = useState("Sign Up");

  // State quản lý thông tin email người dùng
  const [email, setEmail] = useState("");
  // State quản lý mật khẩu người dùng
  const [password, setPassword] = useState("");
  // State quản lý tên đầy đủ người dùng (chỉ hiển thị khi đăng ký)
  const [name, setName] = useState("");
  // State quản lý trạng thái đang xử lý
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Hàm xử lý khi submit form
   * @param {Event} event - Sự kiện submit form
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (state === "Sign Up") {
        result = await signupUser(name, email, password);
      } else {
        result = await loginUser(email, password);
      }

      if (result.success) {
        toast.success(
          state === "Sign Up" ? "Đăng ký thành công!" : "Đăng nhập thành công!",
        );
        navigate("/");
      } else {
        toast.error(result.message || "Có lỗi xảy ra!");
      }
    } catch {
      toast.error("Có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex items-center min-h-[80vh]" onSubmit={onSubmitHandler}>
      {/* Container chính của form */}
      <div className="flex flex-col items-start gap-3 shadow-lg m-auto p-8 border rounded-xl min-w-[340px] sm:min-w-96 text-[#5E5E5E] text-sm">
        {/* Tiêu đề form */}
        <p className="font-semibold text-2xl">
          {state === "Sign Up" ? "Tạo Tài Khoản" : "Đăng Nhập"}
        </p>

        {/* Mô tả form */}
        <p>
          Vui lòng {state === "Sign Up" ? "đăng ký" : "đăng nhập"} để đặt lịch
          hẹn
        </p>

        {/* Trường nhập tên đầy đủ - chỉ hiển thị khi đăng ký */}
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Họ và Tên</p>
            <input
              className="mt-1 p-2 border border-[#DADADA] rounded w-full"
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              value={name}
            />
          </div>
        )}

        {/* Trường nhập email */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="mt-1 p-2 border border-[#DADADA] rounded w-full"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
        </div>

        {/* Trường nhập mật khẩu */}
        <div className="w-full">
          <p>Mật Khẩu</p>
          <input
            className="mt-1 p-2 border border-[#DADADA] rounded w-full"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
          />
        </div>

        {/* Nút submit form */}
        <button
          className="bg-primary my-2 py-2 rounded-md w-full text-white text-base"
          disabled={isLoading}
          type="submit"
        >
          {isLoading
            ? "Đang xử lý..."
            : state === "Sign Up"
              ? "Tạo tài khoản"
              : "Đăng nhập"}
        </button>

        {/* Link chuyển đổi giữa đăng ký và đăng nhập */}
        {state === "Sign Up" ? (
          <p>
            Đã có tài khoản?{" "}
            <button
              className="bg-transparent p-0 border-none text-primary underline cursor-pointer"
              onClick={() => setState("Login")}
              type="button"
            >
              Đăng nhập tại đây
            </button>
          </p>
        ) : (
          <p>
            Tạo tài khoản mới?{" "}
            <button
              className="bg-transparent p-0 border-none text-primary underline cursor-pointer"
              onClick={() => setState("Sign Up")}
              type="button"
            >
              Nhấp vào đây
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
