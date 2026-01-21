import { useState } from "react";

/**
 * Component Login - Trang đăng nhập và đăng ký
 * Cho phép người dùng chuyển đổi giữa chế độ đăng nhập và đăng ký
 */
const Login = () => {
  // State quản lý chế độ hiện tại: "Sign Up" (Đăng ký) hoặc "Login" (Đăng nhập)
  const [state, setState] = useState("Sign Up");

  // State quản lý thông tin email người dùng
  const [email, setEmail] = useState("");
  // State quản lý mật khẩu người dùng
  const [password, setPassword] = useState("");
  // State quản lý tên đầy đủ người dùng (chỉ hiển thị khi đăng ký)
  const [name, setName] = useState("");

  /**
   * Hàm xử lý khi submit form
   * @param {Event} event - Sự kiện submit form
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault();
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
          type="submit"
        >
          {state === "Sign Up" ? "Tạo tài khoản" : "Đăng nhập"}
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
