import { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";

/**
 * Component hiển thị danh sách các cuộc hẹn của người dùng
 * Cho phép người dùng xem thông tin bác sĩ và thực hiện các hành động như thanh toán hoặc hủy lịch hẹn
 */
const MyAppointments = () => {
  // Lấy các hàm và dữ liệu từ AppContext
  const { myAppointments, getMyAppointments, cancelAppointment, formatDate } =
    useAppContext();

  // State để quản lý loading và error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  // Fetch dữ liệu appointments khi component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getMyAppointments();
        if (!result.success) {
          setError(result.message || "Không thể tải danh sách lịch hẹn");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [getMyAppointments]);

  // Hàm xử lý hủy lịch hẹn
  const handleCancelAppointment = async (appointmentId) => {
    setCancellingId(appointmentId);
    try {
      const result = await cancelAppointment(appointmentId);
      if (result.success) {
        // Refresh danh sách appointments sau khi hủy thành công
        await getMyAppointments();
      } else {
        setError(result.message || "Không thể hủy lịch hẹn");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi hủy lịch hẹn");
      console.error("Error cancelling appointment:", err);
    } finally {
      setCancellingId(null);
    }
  };

  // Hàm lấy trạng thái và màu sắc badge
  const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) {
      return { color: "bg-red-500 text-white", text: "Đã hủy" };
    }
    if (appointment.isCompleted) {
      return { color: "bg-gray-500 text-white", text: "Đã hoàn thành" };
    }
    if (appointment.payment) {
      return { color: "bg-yellow-500 text-white", text: "Đã thanh toán" };
    }
    return { color: "bg-blue-500 text-white", text: "Đã đặt" };
  };

  // Hàm format ngày giờ
  const formatDateTime = (date, time) => {
    try {
      const dateObj = new Date(date);
      const formattedDate = formatDate(dateObj); // Sử dụng formatDate từ AppContext với options mặc định
      return `${formattedDate} | ${time}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return `${date} | ${time}`;
    }
  };

  return (
    <div>
      {/* Tiêu đề trang */}
      <p className="mt-12 pb-3 border-b font-medium text-gray-600 text-lg">
        Lịch hẹn của tôi
      </p>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          <span className="ml-2 text-gray-600">Đang tải...</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-100 my-4 px-4 py-3 border border-red-400 rounded text-red-700">
          {error}
        </div>
      )}

      {/* Danh sách các cuộc hẹn */}
      {!loading && !error && (
        <div className="">
          {myAppointments.length === 0 ? (
            <div className="py-8 text-gray-500 text-center">
              Bạn chưa có lịch hẹn nào
            </div>
          ) : (
            myAppointments.map((appointment) => (
              <div
                className="sm:flex gap-4 sm:gap-6 grid grid-cols-[1fr_2fr] py-4 border-b"
                key={appointment._id}
              >
                {/* Hình ảnh bác sĩ */}
                <div>
                  <img
                    alt={appointment.docData?.name || "Doctor"}
                    className="bg-[#EAEFFF] w-36"
                    src={appointment.docData?.image || "/default-doctor.png"}
                  />
                </div>

                {/* Thông tin chi tiết về bác sĩ và cuộc hẹn */}
                <div className="flex-1 text-[#5E5E5E] text-sm">
                  {/* Tên bác sĩ */}
                  <p className="font-semibold text-[#262626] text-base">
                    {appointment.docData?.name || "Không có thông tin"}
                  </p>

                  {/* Chuyên khoa */}
                  <p>
                    {appointment.docData?.speciality || "Không có thông tin"}
                  </p>

                  {/* Địa chỉ */}
                  <p className="mt-1 font-medium text-[#464646]">Địa chỉ:</p>
                  <p className="">
                    {appointment.docData?.address?.line1 ||
                      "Không có thông tin"}
                  </p>
                  {appointment.docData?.address?.line2 && (
                    <p className="">{appointment.docData.address.line2}</p>
                  )}

                  {/* Ngày và giờ hẹn */}
                  <p className="mt-1">
                    <span className="font-medium text-[#3C3C3C] text-sm">
                      Ngày & Giờ:
                    </span>{" "}
                    {formatDateTime(appointment.slotDate, appointment.slotTime)}
                  </p>

                  {/* Trạng thái cuộc hẹn */}
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAppointmentStatus(appointment).color}`}
                    >
                      {getAppointmentStatus(appointment).text}
                    </span>
                  </div>
                </div>

                <div></div>

                {/* Các nút hành động */}
                <div className="flex flex-col justify-end gap-2 text-sm text-center">
                  {/* Nút thanh toán trực tuyến - chỉ hiển thị khi chưa thanh toán và chưa hủy */}
                  {!appointment.payment &&
                    !appointment.cancelled &&
                    !appointment.isCompleted && (
                      <button
                        className="hover:bg-primary py-2 border rounded sm:min-w-48 text-[#696969] hover:text-white transition-all duration-300"
                        type="button"
                      >
                        Thanh toán trực tuyến
                      </button>
                    )}

                  {/* Nút hủy lịch hẹn - chỉ hiển thị khi chưa hủy và chưa hoàn thành */}
                  {!appointment.cancelled && !appointment.isCompleted && (
                    <button
                      className="hover:bg-red-600 disabled:opacity-50 py-2 border rounded sm:min-w-48 text-[#696969] hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
                      disabled={cancellingId === appointment._id}
                      onClick={() => handleCancelAppointment(appointment._id)}
                      type="button"
                    >
                      {cancellingId === appointment._id
                        ? "Đang hủy..."
                        : "Hủy lịch hẹn"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
