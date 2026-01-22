import { useContext } from "react";
import AdminContext from "./AdminContext";

/**
 * Hook tùy chỉnh để sử dụng AdminContext
 * Đảm bảo Context được sử dụng đúng cách và báo lỗi nếu dùng ngoài Provider
 * @returns {Object} Giá trị từ AdminContext
 * @throws {Error} Nếu hook được gọi ngoài AdminContextProvider
 */
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext phải được sử dụng bên trong AdminContextProvider",
    );
  }
  return context;
};
