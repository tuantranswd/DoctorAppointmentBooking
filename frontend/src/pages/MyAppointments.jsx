import { useAppContext } from "../context/useAppContext";

/**
 * Component hiển thị danh sách các cuộc hẹn của người dùng
 * Cho phép người dùng xem thông tin bác sĩ và thực hiện các hành động như thanh toán hoặc hủy lịch hẹn
 */
const MyAppointments = () => {
  // Lấy danh sách bác sĩ từ AppContext
  const { doctors } = useAppContext();

  return (
    <div>
      {/* Tiêu đề trang */}
      <p className="mt-12 pb-3 border-b font-medium text-gray-600 text-lg">
        Lịch hẹn của tôi
      </p>

      {/* Danh sách các cuộc hẹn */}
      <div className="">
        {/* Hiển thị 3 cuộc hẹn đầu tiên từ danh sách bác sĩ */}
        {doctors.slice(0, 3).map((item) => (
          <div
            className="sm:flex gap-4 sm:gap-6 grid grid-cols-[1fr_2fr] py-4 border-b"
            key={item._id}
          >
            {/* Hình ảnh bác sĩ */}
            <div>
              <img alt="" className="bg-[#EAEFFF] w-36" src={item.image} />
            </div>

            {/* Thông tin chi tiết về bác sĩ và cuộc hẹn */}
            <div className="flex-1 text-[#5E5E5E] text-sm">
              {/* Tên bác sĩ */}
              <p className="font-semibold text-[#262626] text-base">
                {item.name}
              </p>

              {/* Chuyên khoa */}
              <p>{item.speciality}</p>

              {/* Địa chỉ */}
              <p className="mt-1 font-medium text-[#464646]">Địa chỉ:</p>
              <p className="">{item.address.line1}</p>
              <p className="">{item.address.line2}</p>

              {/* Ngày và giờ hẹn */}
              <p className="mt-1">
                <span className="font-medium text-[#3C3C3C] text-sm">
                  Ngày & Giờ:
                </span>{" "}
                25 Tháng 1 2026 | 10:30
              </p>
            </div>

            <div></div>

            {/* Các nút hành động */}
            <div className="flex flex-col justify-end gap-2 text-sm text-center">
              {/* Nút thanh toán trực tuyến */}
              <button
                className="hover:bg-primary py-2 border rounded sm:min-w-48 text-[#696969] hover:text-white transition-all duration-300"
                type="button"
              >
                Thanh toán trực tuyến
              </button>

              {/* Nút hủy lịch hẹn */}
              <button
                className="hover:bg-red-600 py-2 border rounded sm:min-w-48 text-[#696969] hover:text-white transition-all duration-300"
                type="button"
              >
                Hủy lịch hẹn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
