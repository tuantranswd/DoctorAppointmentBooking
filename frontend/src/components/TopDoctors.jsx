import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

/**
 * Component hiển thị danh sách 10 bác sĩ nổi bật
 * Mỗi thẻ bác sĩ có thể click để điều hướng đến trang chi tiết đặt lịch
 */
const TopDoctors = () => {
  const navigate = useNavigate();
  // Lấy dữ liệu bác sĩ từ Context thay vì import trực tiếp
  const { doctors } = useAppContext();

  /**
   * Xử lý sự kiện click vào thẻ bác sĩ
   * Điều hướng đến trang chi tiết đặt lịch và cuộn lên đầu trang
   * @param {string} docId - ID của bác sĩ được chọn
   */
  const handleDoctorClick = (docId) => {
    navigate(`/appointment/${docId}`);
    window.scrollTo(0, 0);
  };

  /**
   * Xử lý sự kiện nhấn phím trên thẻ bác sĩ
   * Cho phép điều hướng bằng phím Enter hoặc Space
   * @param {KeyboardEvent} event - Sự kiện bàn phím
   * @param {string} docId - ID của bác sĩ được chọn
   */
  const handleDoctorKeyDown = (event, docId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDoctorClick(docId);
    }
  };

  /**
   * Xử lý sự kiện click vào nút "more"
   * Điều hướng đến trang danh sách tất cả bác sĩ
   */
  const handleMoreClick = () => {
    navigate("/doctors/");
  };

  // Lấy 10 bác sĩ đầu tiên từ danh sách
  const topDoctors = doctors.slice(0, 10);

  return (
    <div className="flex flex-col items-center gap-4 md:mx-10 my-16 text-[#262626]">
      {/* Tiêu đề section */}
      <h1 className="font-medium text-3xl">Bác sĩ nổi bật</h1>

      {/* Mô tả section */}
      <p className="sm:w-1/3 text-sm text-center">
        Duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi.
      </p>

      {/* Grid hiển thị danh sách bác sĩ */}
      <div className="gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full">
        {topDoctors.map((doctor) => (
          <button
            className="border border-[#C9D8FF] rounded-xl w-full overflow-hidden text-left transition-all hover:translate-y-[-10px] duration-500 cursor-pointer"
            key={doctor._id}
            onClick={() => handleDoctorClick(doctor._id)}
            onKeyDown={(event) => handleDoctorKeyDown(event, doctor._id)}
            type="button"
          >
            {/* Hình ảnh bác sĩ */}
            <img
              alt={doctor.name}
              className="bg-[#EAEFFF]"
              src={doctor.image}
            />

            {/* Thông tin bác sĩ */}
            <div className="p-4">
              {/* Trạng thái khả dụng */}
              <div className="flex items-center gap-2 text-green-500 text-sm text-center">
                <p className="bg-green-500 rounded-full w-2 h-2"></p>
                <p>Đang trống lịch</p>
              </div>

              {/* Tên bác sĩ */}
              <p className="font-medium text-[#262626] text-base">
                {doctor.name}
              </p>

              {/* Chuyên khoa */}
              <p className="text-[#5C5C5C] text-sm">{doctor.speciality}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Nút xem thêm bác sĩ */}
      <button
        className="bg-[#EAEFFF] mt-10 px-12 py-3 rounded-full text-gray-600 cursor-pointer"
        onClick={handleMoreClick}
        type="button"
      >
        Xem thêm
      </button>
    </div>
  );
};

export default TopDoctors;
