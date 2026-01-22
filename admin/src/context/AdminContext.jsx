import { createContext, useCallback, useContext, useState } from "react";

/**
 * Context quản lý trạng thái và các phương thức API cho Admin
 * Bao gồm: token xác thực, đăng nhập, thêm bác sĩ, lấy danh sách cuộc hẹn
 */
const AdminContext = createContext();

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

/**
 * Base URL của API Admin
 */
const API_BASE_URL = "http://localhost:4000/api/admin";

/**
 * Provider component cho AdminContext
 * Quản lý token xác thực và cung cấp các phương thức gọi API Admin
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con
 */
export const AdminContextProvider = ({ children }) => {
  // Lưu trữ token từ localStorage hoặc state
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem("adminToken") || null;
  });

  /**
   * Lưu token vào localStorage và state
   * @param {string} token - JWT token từ server
   */
  const saveToken = useCallback((token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
  }, []);

  /**
   * Xóa token khỏi localStorage và state (đăng xuất)
   */
  const removeToken = useCallback(() => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  }, []);

  /**
   * Đăng nhập Admin
   * @param {string} email - Email của Admin
   * @param {string} password - Mật khẩu của Admin
   * @returns {Promise<Object>} Kết quả đăng nhập (success, message, token)
   */
  const loginAdmin = useCallback(
    async (email, password) => {
      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const data = await response.json();

        if (data.success && data.token) {
          saveToken(data.token);
        }

        return data;
      } catch (error) {
        console.error("Lỗi khi đăng nhập Admin:", error);
        return {
          message: "Đã xảy ra lỗi khi kết nối đến server",
          success: false,
        };
      }
    },
    [saveToken],
  );

  /**
   * Thêm bác sĩ mới
   * @param {Object} doctorData - Dữ liệu bác sĩ cần thêm
   * @param {string} doctorData.name - Tên bác sĩ
   * @param {string} doctorData.email - Email bác sĩ
   * @param {string} doctorData.password - Mật khẩu bác sĩ
   * @param {string} doctorData.speciality - Chuyên khoa
   * @param {string} doctorData.degree - Bằng cấp
   * @param {string} doctorData.experience - Kinh nghiệm
   * @param {string} doctorData.about - Giới thiệu về bác sĩ
   * @param {number} doctorData.fees - Phí khám
   * @param {Object} doctorData.address - Địa chỉ phòng khám
   * @param {File} doctorData.image - File ảnh đại diện
   * @returns {Promise<Object>} Kết quả thêm bác sĩ (success, message, doctor)
   */
  const addDoctor = useCallback(
    async (doctorData) => {
      try {
        // Kiểm tra token có tồn tại không
        if (!adminToken) {
          return {
            message: "Vui lòng đăng nhập để thực hiện thao tác này",
            success: false,
          };
        }

        // Tạo FormData để gửi file và dữ liệu
        const formData = new FormData();
        formData.append("name", doctorData.name);
        formData.append("email", doctorData.email);
        formData.append("password", doctorData.password);
        formData.append("speciality", doctorData.speciality);
        formData.append("degree", doctorData.degree);
        formData.append("experience", doctorData.experience);
        formData.append("about", doctorData.about);
        formData.append("fees", doctorData.fees.toString());
        formData.append("address", JSON.stringify(doctorData.address));

        if (doctorData.image) {
          formData.append("image", doctorData.image);
        }

        const response = await fetch(`${API_BASE_URL}/add-doctor`, {
          body: formData,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          method: "POST",
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Lỗi khi thêm bác sĩ:", error);
        return {
          message: "Đã xảy ra lỗi khi kết nối đến server",
          success: false,
        };
      }
    },
    [adminToken],
  );

  /**
   * Lấy danh sách cuộc hẹn (Appointments)
   * @param {Object} filters - Bộ lọc (tùy chọn)
   * @returns {Promise<Object>} Danh sách cuộc hẹn (success, appointments)
   */
  const getAppointments = useCallback(
    async (filters = {}) => {
      try {
        // Kiểm tra token có tồn tại không
        if (!adminToken) {
          return {
            message: "Vui lòng đăng nhập để thực hiện thao tác này",
            success: false,
          };
        }

        // Tạo query string từ filters
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${API_BASE_URL}/appointments${queryParams ? `?${queryParams}` : ""}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách cuộc hẹn:", error);
        return {
          message: "Đã xảy ra lỗi khi kết nối đến server",
          success: false,
        };
      }
    },
    [adminToken],
  );

  /**
   * Hủy lịch hẹn bởi Admin
   * @param {string} appointmentId - ID của lịch hẹn cần hủy
   * @returns {Promise<Object>} Kết quả hủy lịch hẹn (success, message)
   */
  const cancelAppointmentByAdmin = useCallback(
    async (appointmentId) => {
      try {
        // Kiểm tra token có tồn tại không
        if (!adminToken) {
          return {
            message: "Vui lòng đăng nhập để thực hiện thao tác này",
            success: false,
          };
        }

        const response = await fetch(`${API_BASE_URL}/cancel-appointment`, {
          body: JSON.stringify({ appointmentId }),
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Lỗi khi hủy lịch hẹn:", error);
        return {
          message: "Đã xảy ra lỗi khi kết nối đến server",
          success: false,
        };
      }
    },
    [adminToken],
  );

  /**
   * Giá trị Context bao gồm:
   * - adminToken: Token xác thực Admin hiện tại
   * - loginAdmin: Hàm đăng nhập Admin
   * - addDoctor: Hàm thêm bác sĩ mới
   * - getAppointments: Hàm lấy danh sách cuộc hẹn
   * - cancelAppointmentByAdmin: Hàm hủy lịch hẹn bởi Admin
   * - removeToken: Hàm đăng xuất (xóa token)
   * - isAuthenticated: Trạng thái đã đăng nhập hay chưa
   */
  const value = {
    addDoctor,
    adminToken,
    cancelAppointmentByAdmin,
    getAppointments,
    isAuthenticated: !!adminToken,
    loginAdmin,
    removeToken,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;
