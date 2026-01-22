import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";

/**
 * Component bảo vệ các route cần xác thực
 * Kiểm tra token và trạng thái khởi tạo trước khi cho phép truy cập
 */
const ProtectedRoute = ({ children }) => {
  const { token, isInitialized } = useAppContext();

  // Đợi cho đến khi context đã khởi tạo xong từ localStorage
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  // Nếu không có token sau khi đã khởi tạo, redirect về trang login
  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
