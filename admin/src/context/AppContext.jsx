import { createContext, useContext } from "react";

/**
 * Context chứa các hàm tiện ích dùng chung cho ứng dụng Admin
 * Bao gồm: định dạng ngày tháng, tiền tệ
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
 * Hàm format ngày tháng thành định dạng tiếng Việt
 * Ví dụ: new Date() -> "Thứ Hai, 01 tháng 01 năm 2024"
 * @param {Date|number|string} date - Ngày cần format (Date object, timestamp, hoặc chuỗi ngày)
 * @param {Object} options - Tùy chọn format (mặc định: { dateStyle: 'full', timeStyle: undefined })
 * @returns {string} Chuỗi ngày đã được format theo định dạng tiếng Việt
 */
const formatDate = (date, options = {}) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Kiểm tra nếu date không hợp lệ
  if (Number.isNaN(dateObj.getTime())) {
    return "Ngày không hợp lệ";
  }

  const defaultOptions = {
    dateStyle: "full",
    ...options,
  };

  return new Intl.DateTimeFormat("vi-VN", defaultOptions).format(dateObj);
};

/**
 * Provider component cho AppContext
 * Cung cấp các hàm tiện ích cho toàn bộ ứng dụng Admin
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con
 */
export const AppContextProvider = ({ children }) => {
  /**
   * Giá trị Context bao gồm:
   * - formatCurrency: Hàm format tiền VND
   * - formatDate: Hàm format ngày tháng tiếng Việt
   */
  const value = {
    formatCurrency,
    formatDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
