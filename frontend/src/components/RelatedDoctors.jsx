import { useNavigate } from "react-router-dom";

/**
 * Component hiển thị danh sách các bác sĩ liên quan
 * Hiển thị tối đa 5 bác sĩ cùng chuyên khoa với bác sĩ hiện tại
 * @param {Object} props - Props của component
 * @param {Array} props.relatedDoctors - Mảng chứa thông tin các bác sĩ liên quan
 */
const RelatedDoctors = ({ relatedDoctors }) => {
  const navigate = useNavigate();

  // Nếu không có bác sĩ liên quan thì không hiển thị component
  if (!relatedDoctors || relatedDoctors.length === 0) return null;

  /**
   * Xử lý điều hướng khi click vào thẻ bác sĩ
   * Chuyển đến trang chi tiết đặt lịch của bác sĩ được chọn và cuộn về đầu trang
   * @param {string} doctorId - ID của bác sĩ được chọn
   */
  const handleDoctorClick = (doctorId) => {
    // Cuộn về đầu trang trước khi điều hướng để đảm bảo UX tốt
    window.scrollTo({ behavior: "smooth", top: 0 });
    navigate(`/appointment/${doctorId}`);
  };

  /**
   * Xử lý điều hướng bằng bàn phím cho thẻ bác sĩ
   * Cho phép điều hướng bằng phím Enter hoặc Space để hỗ trợ accessibility
   * @param {KeyboardEvent} e - Sự kiện bàn phím
   * @param {string} doctorId - ID của bác sĩ được chọn
   */
  const handleDoctorKeyDown = (e, doctorId) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleDoctorClick(doctorId);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
      {/* Tiêu đề section */}
      <h1 className="font-medium text-3xl">Bác sĩ liên quan</h1>

      {/* Mô tả section */}
      <p className="sm:w-1/3 text-sm text-center">
        Duyệt qua danh sách các bác sĩ đáng tin cậy của chúng tôi.
      </p>

      {/* Grid hiển thị danh sách bác sĩ liên quan */}
      <div className="gap-4 gap-y-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3 sm:px-0 pt-5 w-full">
        {relatedDoctors.slice(0, 5).map((doc) => (
          <button
            className="border border-[#C9D8FF] rounded-xl overflow-hidden transition-all hover:translate-y-[-10px] duration-500 cursor-pointer"
            key={doc._id}
            onClick={() => handleDoctorClick(doc._id)}
            onKeyDown={(e) => handleDoctorKeyDown(e, doc._id)}
            type="button"
          >
            {/* Hình ảnh bác sĩ */}
            <img alt={doc.name} className="bg-[#EAEFFF]" src={doc.image} />

            {/* Thông tin bác sĩ */}
            <div className="p-4">
              {/* Trạng thái khả dụng */}
              <div className="flex items-center gap-2 text-green-500 text-sm text-center">
                <p className="bg-green-500 rounded-full w-2 h-2"></p>
                <p>Đang trống lịch</p>
              </div>

              {/* Tên bác sĩ */}
              <p className="font-medium text-[#262626] text-lg">{doc.name}</p>

              {/* Chuyên khoa */}
              <p className="text-[#5C5C5C] text-sm">{doc.speciality}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
