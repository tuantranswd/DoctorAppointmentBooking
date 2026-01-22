import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { specialityData } from "../assets/assets_frontend/assets";

// Tạo instance Axios với baseURL từ biến môi trường
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

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
 * Hàm format ngày tháng thành định dạng tiếng Việt
 * Ví dụ: new Date() -> "Thứ Hai, 01/01/2024"
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
 * Cung cấp dữ liệu và hàm tiện ích cho toàn bộ ứng dụng
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con
 */
export const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState({});
  const [doctors, setDoctors] = useState([]);

  // Hàm lấy danh sách bác sĩ từ API
  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-doctors");
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    }
  }, []);

  // Hàm đăng ký người dùng
  const signupUser = async (name, email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/user/signup", {
        email,
        name,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user);
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Hàm đăng nhập người dùng
  const loginUser = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user);
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Hàm đăng xuất người dùng
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData({});
  };

  // Hàm lấy hồ sơ người dùng
  const getUserProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/get-profile");
      if (data.success) {
        setUserData(data.user);
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi lấy hồ sơ:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Hàm cập nhật hồ sơ người dùng
  const updateUserProfile = async (formData) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/update-profile",
        formData,
      );
      if (data.success) {
        setUserData(data.user);
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Cấu hình Axios interceptor để tự động thêm header Authorization
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Gọi getDoctorsData khi component mount
  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  /**
   * Giá trị Context bao gồm:
   * - doctors: Danh sách tất cả bác sĩ từ API
   * - specialityData: Danh sách các chuyên khoa
   * - formatCurrency: Hàm format tiền VND
   * - formatDate: Hàm format ngày tháng tiếng Việt
   * - token: JWT token
   * - userData: Thông tin người dùng hiện tại
   * - getDoctorsData: Hàm lấy danh sách bác sĩ
   * - signupUser: Hàm đăng ký
   * - loginUser: Hàm đăng nhập
   * - logoutUser: Hàm đăng xuất
   * - getUserProfile: Hàm lấy hồ sơ
   * - updateUserProfile: Hàm cập nhật hồ sơ
   */
  const value = {
    doctors,
    formatCurrency,
    formatDate,
    getDoctorsData,
    getUserProfile,
    loginUser,
    logoutUser,
    signupUser,
    specialityData,
    token,
    updateUserProfile,
    userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
