import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

/**
 * Component hiển thị danh sách bác sĩ với khả năng lọc theo chuyên khoa
 * Cho phép người dùng duyệt và tìm kiếm bác sĩ theo các chuyên khoa khác nhau
 */
const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const _location = useLocation();
  const { doctors, specialityData } = useAppContext();

  // Tính toán chuyên khoa được chọn từ URL params thay vì lưu trong state
  // Điều này tránh việc phải đồng bộ state với URL params trong useEffect
  const selectedSpeciality = useMemo(
    () => decodeURIComponent(speciality || ""),
    [speciality],
  );

  // State quản lý hiển thị/ẩn bộ lọc trên mobile
  const [showFilters, setShowFilters] = useState(false);

  /**
   * Lọc danh sách bác sĩ theo chuyên khoa được chọn
   * Trả về tất cả bác sĩ nếu không có chuyên khoa nào được chọn
   */
  const applyFilter = useMemo(() => {
    if (!selectedSpeciality) {
      return doctors;
    }
    return doctors.filter((doctor) => doctor.speciality === selectedSpeciality);
  }, [doctors, selectedSpeciality]);

  /**
   * Xử lý khi người dùng click vào một chuyên khoa
   * Nếu chuyên khoa đã được chọn thì bỏ chọn, ngược lại thì chọn chuyên khoa đó
   * Chuyên khoa được chọn được quản lý thông qua URL params, không cần state riêng
   * @param {string} specialityName - Tên chuyên khoa được click
   */
  const handleSpecialityClick = (specialityName) => {
    const encodedSpeciality = encodeURIComponent(specialityName);
    if (selectedSpeciality === specialityName) {
      // Nếu chuyên khoa đã được chọn, điều hướng về trang danh sách bác sĩ không có filter
      navigate("/doctors");
    } else {
      // Nếu chuyên khoa chưa được chọn, điều hướng đến URL với chuyên khoa đó
      navigate(`/doctors/${encodedSpeciality}`);
    }
  };

  /**
   * Kiểm tra xem một chuyên khoa có đang được chọn hay không
   * @param {string} specialityName - Tên chuyên khoa cần kiểm tra
   * @returns {boolean} True nếu chuyên khoa đang được chọn
   */
  const isSpecialitySelected = (specialityName) => {
    return selectedSpeciality === specialityName;
  };

  /**
   * Tự động cuộn về đầu trang khi component được mount hoặc khi chuyên khoa thay đổi
   * Đảm bảo người dùng luôn thấy phần đầu của trang khi vào trang danh sách bác sĩ hoặc khi lọc
   */
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    <div>
      <p className="text-gray-600">Duyệt qua các chuyên khoa bác sĩ.</p>
      <div className="flex sm:flex-row flex-col items-start gap-5 mt-5">
        {/* Nút hiển thị bộ lọc trên mobile */}
        <button
          className="sm:hidden px-3 py-1 border rounded text-sm transition-all"
          onClick={() => setShowFilters(!showFilters)}
          type="button"
        >
          Bộ lọc
        </button>

        {/* Danh sách các chuyên khoa để lọc */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilters ? "flex" : "hidden sm:flex"
          }`}
        >
          {specialityData.map((item) => (
            <button
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer text-left ${
                isSpecialitySelected(item.speciality)
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : ""
              }`}
              key={item.speciality}
              onClick={() => handleSpecialityClick(item.speciality)}
              type="button"
            >
              {item.speciality}
            </button>
          ))}
        </div>

        {/* Grid hiển thị danh sách bác sĩ */}
        <div className="gap-4 gap-y-6 grid grid-cols-auto w-full">
          {applyFilter.length > 0 ? (
            applyFilter.map((doctor) => (
              // biome-ignore lint/a11y/useSemanticElements: Card layout cần div để giữ cấu trúc, đã có keyboard handlers và ARIA
              <div
                aria-label={`Xem chi tiết bác sĩ ${doctor.name}`}
                className="border border-[#C9D8FF] rounded-xl overflow-hidden transition-all hover:translate-y-[-10px] duration-500 cursor-pointer"
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/appointment/${doctor._id}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <img
                  alt={doctor.name}
                  className="bg-[#EAEFFF]"
                  src={doctor.image}
                />
                <div className="p-4">
                  {/* Trạng thái khả dụng của bác sĩ */}
                  <div className="flex items-center gap-2 text-green-500 text-sm text-center">
                    <p className="bg-green-500 rounded-full w-2 h-2"></p>
                    <p>Đang trống lịch</p>
                  </div>
                  {/* Tên bác sĩ */}
                  <p className="font-medium text-[#262626] text-lg">
                    {doctor.name}
                  </p>
                  {/* Chuyên khoa của bác sĩ */}
                  <p className="text-[#5C5C5C] text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center">
              <p className="text-gray-500 text-lg">
                Không tìm thấy bác sĩ cho chuyên khoa này.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
