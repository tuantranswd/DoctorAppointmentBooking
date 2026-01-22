import { useContext } from "react";
import AppContext from "./AppContext";

/**
 * Hook tùy chỉnh để sử dụng AppContext
 * Đảm bảo Context được sử dụng đúng cách và báo lỗi nếu dùng ngoài Provider
 * @returns {Object} Giá trị từ AppContext
 * @throws {Error} Nếu hook được gọi ngoài AppContextProvider
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useAppContext phải được sử dụng bên trong AppContextProvider",
    );
  }
  return context;
};
