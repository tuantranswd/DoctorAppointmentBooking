import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
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
  const [myAppointments, setMyAppointments] = useState([]);

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

  // Hàm đặt lịch hẹn
  const bookAppointment = async (docId, slotDate, slotTime) => {
    try {
      const { data } = await axiosInstance.post("/api/user/book-appointment", {
        docId,
        slotDate,
        slotTime,
      });
      if (data.success) {
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi đặt lịch hẹn:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Hàm lấy danh sách lịch hẹn của tôi
  const getMyAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/my-appointments");
      if (data.success) {
        setMyAppointments(data.appointments);
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
      return {
        message: error.response?.data?.message || "Lỗi không xác định",
        success: false,
      };
    }
  };

  // Hàm hủy lịch hẹn
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/cancel-appointment",
        {
          appointmentId,
        },
      );
      if (data.success) {
        return { success: true };
      } else {
        return { message: data.message, success: false };
      }
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
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
    // Sử dụng async function để tránh gọi setState đồng bộ trong effect
    const fetchDoctors = async () => {
      await getDoctorsData();
    };
    fetchDoctors();
  }, [getDoctorsData]);

  /**
   * Giá trị Context bao gồm:
   * - doctors: Danh sách tất cả bác sĩ từ API
   * - specialityData: Danh sách các chuyên khoa
   * - formatCurrency: Hàm format tiền VND
   * - formatDate: Hàm format ngày tháng tiếng Việt
   * - token: JWT token
   * - userData: Thông tin người dùng hiện tại
   * - myAppointments: Danh sách lịch hẹn của người dùng
   * - getDoctorsData: Hàm lấy danh sách bác sĩ
   * - signupUser: Hàm đăng ký
   * - loginUser: Hàm đăng nhập
   * - logoutUser: Hàm đăng xuất
   * - getUserProfile: Hàm lấy hồ sơ
   * - updateUserProfile: Hàm cập nhật hồ sơ
   * - bookAppointment: Hàm đặt lịch hẹn
   * - getMyAppointments: Hàm lấy danh sách lịch hẹn
   * - cancelAppointment: Hàm hủy lịch hẹn
   */
  const value = {
    bookAppointment,
    cancelAppointment,
    doctors,
    formatCurrency,
    formatDate,
    getDoctorsData,
    getMyAppointments,
    getUserProfile,
    loginUser,
    logoutUser,
    myAppointments,
    signupUser,
    specialityData,
    token,
    updateUserProfile,
    userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
