import { createContext, useCallback, useContext, useState } from "react";

/**
 * Context quản lý dữ liệu liên quan đến bác sĩ
 * Bao gồm: danh sách bác sĩ, chi tiết bác sĩ, lọc và tìm kiếm bác sĩ
 */
const DoctorContext = createContext();

/**
 * Hook tùy chỉnh để sử dụng DoctorContext
 * Đảm bảo Context được sử dụng đúng cách và báo lỗi nếu dùng ngoài Provider
 * @returns {Object} Giá trị từ DoctorContext
 * @throws {Error} Nếu hook được gọi ngoài DoctorContextProvider
 */
export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error(
      "useDoctorContext phải được sử dụng bên trong DoctorContextProvider",
    );
  }
  return context;
};

/**
 * Provider component cho DoctorContext
 * Quản lý dữ liệu và trạng thái liên quan đến bác sĩ
 * @param {Object} props - Props của component
 * @param {React.ReactNode} props.children - Các component con
 */
export const DoctorContextProvider = ({ children }) => {
  // Danh sách tất cả bác sĩ
  const [doctors, setDoctors] = useState([]);

  // Bác sĩ đang được chọn/xem chi tiết
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Trạng thái loading khi fetch dữ liệu
  const [isLoading, setIsLoading] = useState(false);

  // Lỗi nếu có
  const [error, setError] = useState(null);

  /**
   * Lấy danh sách tất cả bác sĩ
   * @param {Object} filters - Bộ lọc (tùy chọn)
   * @param {string} filters.speciality - Lọc theo chuyên khoa
   * @param {string} filters.search - Tìm kiếm theo tên
   * @returns {Promise<void>}
   */
  const fetchDoctors = useCallback(async (_filters = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Thay thế bằng API call thực tế khi backend có endpoint
      // Hiện tại sử dụng dữ liệu từ assets hoặc có thể fetch từ API
      // const response = await fetch(`/api/doctors?${new URLSearchParams(filters)}`);
      // const data = await response.json();
      // setDoctors(data.doctors || []);

      // Tạm thời trả về mảng rỗng, sẽ được cập nhật khi có API
      setDoctors([]);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách bác sĩ:", err);
      setError("Không thể tải danh sách bác sĩ");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Lấy thông tin chi tiết của một bác sĩ theo ID
   * @param {string} doctorId - ID của bác sĩ
   * @returns {Promise<void>}
   */
  const fetchDoctorById = useCallback(async (_doctorId) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Thay thế bằng API call thực tế khi backend có endpoint
      // const response = await fetch(`/api/doctors/${doctorId}`);
      // const data = await response.json();
      // setSelectedDoctor(data.doctor);

      // Tạm thời set null, sẽ được cập nhật khi có API
      setSelectedDoctor(null);
    } catch (err) {
      console.error("Lỗi khi lấy thông tin bác sĩ:", err);
      setError("Không thể tải thông tin bác sĩ");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Lọc danh sách bác sĩ theo chuyên khoa
   * @param {string} speciality - Tên chuyên khoa
   * @param {Array} doctorsList - Danh sách bác sĩ để lọc (mặc định là doctors state)
   * @returns {Array} Danh sách bác sĩ đã được lọc
   */
  const filterDoctorsBySpeciality = useCallback(
    (speciality, doctorsList = doctors) => {
      if (!speciality) return doctorsList;
      return doctorsList.filter(
        (doctor) =>
          doctor.speciality.toLowerCase() === speciality.toLowerCase(),
      );
    },
    [doctors],
  );

  /**
   * Tìm kiếm bác sĩ theo tên
   * @param {string} searchTerm - Từ khóa tìm kiếm
   * @param {Array} doctorsList - Danh sách bác sĩ để tìm kiếm (mặc định là doctors state)
   * @returns {Array} Danh sách bác sĩ khớp với từ khóa
   */
  const searchDoctors = useCallback(
    (searchTerm, doctorsList = doctors) => {
      if (!searchTerm.trim()) return doctorsList;

      const term = searchTerm.toLowerCase();
      return doctorsList.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(term) ||
          doctor.speciality.toLowerCase().includes(term) ||
          doctor.about?.toLowerCase().includes(term),
      );
    },
    [doctors],
  );

  /**
   * Lấy danh sách bác sĩ theo chuyên khoa và từ khóa tìm kiếm
   * @param {Object} options - Tùy chọn lọc và tìm kiếm
   * @param {string} options.speciality - Chuyên khoa cần lọc
   * @param {string} options.searchTerm - Từ khóa tìm kiếm
   * @returns {Array} Danh sách bác sĩ đã được lọc và tìm kiếm
   */
  const getFilteredDoctors = useCallback(
    (options = {}) => {
      let result = doctors;

      // Lọc theo chuyên khoa trước
      if (options.speciality) {
        result = filterDoctorsBySpeciality(options.speciality, result);
      }

      // Sau đó tìm kiếm theo từ khóa
      if (options.searchTerm) {
        result = searchDoctors(options.searchTerm, result);
      }

      return result;
    },
    [doctors, filterDoctorsBySpeciality, searchDoctors],
  );

  /**
   * Thiết lập bác sĩ được chọn
   * @param {Object|null} doctor - Đối tượng bác sĩ hoặc null để bỏ chọn
   */
  const selectDoctor = useCallback((doctor) => {
    setSelectedDoctor(doctor);
  }, []);

  /**
   * Xóa lỗi hiện tại
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Giá trị Context bao gồm:
   * - doctors: Danh sách tất cả bác sĩ
   * - selectedDoctor: Bác sĩ đang được chọn/xem chi tiết
   * - isLoading: Trạng thái đang tải dữ liệu
   * - error: Thông báo lỗi nếu có
   * - fetchDoctors: Hàm lấy danh sách bác sĩ
   * - fetchDoctorById: Hàm lấy thông tin chi tiết bác sĩ
   * - filterDoctorsBySpeciality: Hàm lọc bác sĩ theo chuyên khoa
   * - searchDoctors: Hàm tìm kiếm bác sĩ
   * - getFilteredDoctors: Hàm lấy danh sách bác sĩ đã được lọc và tìm kiếm
   * - selectDoctor: Hàm thiết lập bác sĩ được chọn
   * - clearError: Hàm xóa lỗi
   * - setDoctors: Hàm set danh sách bác sĩ trực tiếp
   */
  const value = {
    clearError,
    doctors,
    error,
    fetchDoctorById,
    fetchDoctors,
    filterDoctorsBySpeciality,
    getFilteredDoctors,
    isLoading,
    searchDoctors,
    selectDoctor,
    selectedDoctor,
    setDoctors,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContext;
