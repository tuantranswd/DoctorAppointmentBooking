import { Navigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext.jsx";

/**
 * Component Route Guard để bảo vệ các routes yêu cầu xác thực
 * Kiểm tra xem người dùng đã đăng nhập chưa
 * Nếu chưa đăng nhập, chuyển hướng đến trang Login
 * Nếu đã đăng nhập, cho phép truy cập vào route được bảo vệ
 *
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Component con cần được bảo vệ
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminContext();

  // Nếu chưa đăng nhập, chuyển hướng đến trang Login
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  // Nếu đã đăng nhập, render component con
  return children;
}

export default ProtectedRoute;
