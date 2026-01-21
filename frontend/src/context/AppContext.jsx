import { createContext, useContext } from "react";
import { doctors, specialityData } from "../assets/assets_frontend/assets";

/**
 * Context chứa dữ liệu và hàm tiện ích toàn cục cho ứng dụng
 * Bao gồm danh sách bác sĩ, chuyên khoa và hàm format tiền tệ
 */
const AppContext = createContext();

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

/**
 * Hàm format số tiền thành định dạng tiền Việt Nam (VND)
 * Ví dụ: 200000 -> "200.000 ₫"
 * @param {number} amount - Số tiền cần format
 * @returns {string} Chuỗi tiền đã được format theo định dạng VND
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(amount);
};

/**
 * Provider component cho AppContext
 * Cung cấp dữ liệu và hàm tiện ích cho toàn bộ ứng dụng
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con
 */
export const AppContextProvider = ({ children }) => {
  /**
   * Giá trị Context bao gồm:
   * - doctors: Danh sách tất cả bác sĩ
   * - specialityData: Danh sách các chuyên khoa
   * - formatCurrency: Hàm format tiền VND
   */
  const value = {
    doctors,
    formatCurrency,
    specialityData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
