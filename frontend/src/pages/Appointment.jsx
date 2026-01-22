import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { useAppContext } from "../context/useAppContext";

/**
 * Component trang đặt lịch hẹn với bác sĩ
 * Hiển thị thông tin bác sĩ, cho phép chọn ngày và giờ đặt lịch
 */
const Appointment = () => {
  // Lấy ID bác sĩ từ URL params
  const { docId } = useParams();

  // Lấy dữ liệu bác sĩ và hàm format tiền tệ từ Context
  const { doctors, formatCurrency, bookAppointment, getDoctorsData } =
    useAppContext();

  /**
   * Tìm bác sĩ dựa trên docId từ danh sách doctors
   * Sử dụng useMemo để tối ưu hiệu suất, chỉ tính toán lại khi doctors hoặc docId thay đổi
   */
  const doctor = useMemo(() => {
    if (doctors && docId) {
      return doctors.find((d) => d._id === docId);
    }
    return null;
  }, [doctors, docId]);

  // State quản lý các slot thời gian có sẵn
  const [slots, setSlots] = useState([]);

  // State lưu index của ngày được chọn (0-6 tương ứng với 7 ngày)
  const [slotIndex, setSlotIndex] = useState(0);

  // State lưu giờ được chọn (format: "HH:MM")
  const [slotTime, setSlotTime] = useState("");

  // State quản lý trạng thái loading khi đặt lịch
  const [isBooking, setIsBooking] = useState(false);

  // State quản lý thông báo
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Ref để quản lý polling interval
  const pollingIntervalRef = useRef(null);

  // Mảng các ngày trong tuần (viết tắt tiếng Anh)
  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  /**
   * Kiểm tra xem một slot có khả dụng hay không
   * @param {string} slotDate - Ngày slot (format: YYYY-MM-DD)
   * @param {string} slotTime - Giờ slot (format: HH:MM)
   * @returns {boolean} true nếu slot khả dụng, false nếu đã được đặt
   */
  const isSlotAvailable = useCallback(
    (slotDate, slotTime) => {
      if (!doctor || !doctor.slots_booked) return true;

      const slotsBooked = doctor.slots_booked;
      return !slotsBooked[slotDate]?.includes(slotTime);
    },
    [doctor],
  );

  /**
   * Xử lý đặt lịch hẹn
   */
  const handleBookAppointment = async () => {
    if (!slotTime || !doctor) return;

    setIsBooking(true);
    setNotification({ message: "", type: "" });

    try {
      // Tạo ngày slot từ slot được chọn
      const selectedSlot = slots[slotIndex]?.find(
        (slot) => slot.time === slotTime,
      );
      if (!selectedSlot) {
        throw new Error("Không tìm thấy slot được chọn");
      }

      // Format ngày theo định dạng YYYY-MM-DD
      const slotDate = selectedSlot.datetime.toISOString().split("T")[0];

      // Kiểm tra slot vẫn còn khả dụng trước khi đặt
      if (!isSlotAvailable(slotDate, slotTime)) {
        setNotification({
          message:
            "Slot này đã được đặt bởi người khác. Vui lòng chọn slot khác.",
          type: "error",
        });
        return;
      }

      // Gọi API đặt lịch
      const result = await bookAppointment(doctor._id, slotDate, slotTime);

      if (result.success) {
        setNotification({
          message:
            "Đặt lịch hẹn thành công! Bạn sẽ nhận được xác nhận qua email.",
          type: "success",
        });

        // Reset selection
        setSlotTime("");

        // Refresh doctor data để cập nhật slots_booked
        await getDoctorsData();
      } else {
        setNotification({
          message: result.message || "Có lỗi xảy ra khi đặt lịch hẹn",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      setNotification({
        message: "Có lỗi xảy ra khi đặt lịch hẹn. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      setIsBooking(false);
    }
  };

  /**
   * Hàm refresh doctor data
   */
  const refreshDoctorData = useCallback(async () => {
    try {
      await getDoctorsData();
    } catch (error) {
      console.error("Lỗi khi refresh doctor data:", error);
    }
  }, [getDoctorsData]);

  /**
   * Tính toán các slot thời gian có sẵn trong 7 ngày tiếp theo
   * Mỗi ngày có các slot từ 10:00 đến 21:00, mỗi slot cách nhau 30 phút
   * Ngày đầu tiên bắt đầu từ giờ hiện tại + 1 giờ (tối thiểu 10:00)
   * Sử dụng useMemo để tránh tính toán lại không cần thiết
   */
  const availableSlots = useMemo(() => {
    // Nếu chưa có thông tin bác sĩ thì trả về mảng rỗng
    if (!doctor) return [];

    const today = new Date();
    const slotsArray = [];

    // Tạo slots cho 7 ngày tiếp theo
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      // Tính ngày hiện tại + i ngày
      currentDate.setDate(today.getDate() + i);

      // Thời gian kết thúc là 21:00
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Xử lý thời gian bắt đầu
      if (i === 0) {
        // Ngày đầu tiên: bắt đầu từ giờ hiện tại + 1 giờ (tối thiểu 10:00)
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        // Làm tròn phút: nếu > 30 thì làm tròn lên 30, không thì về 0
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // Các ngày sau: bắt đầu từ 10:00
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];

      // Tạo các slot thời gian cách nhau 30 phút cho đến 21:00
      while (currentDate < endTime) {
        // Format thời gian theo định dạng 24 giờ (HH:MM)
        const formattedTime = currentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
          minute: "2-digit",
        });

        // Lưu thông tin slot bao gồm datetime và time đã format
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Tăng thêm 30 phút cho slot tiếp theo
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    return slotsArray;
  }, [doctor]);

  /**
   * Cập nhật slots state khi availableSlots thay đổi
   * Đảm bảo slots luôn đồng bộ với availableSlots
   */
  useEffect(() => {
    setSlots(availableSlots);
  }, [availableSlots]);

  /**
   * Tự động cuộn về đầu trang khi component được mount hoặc khi docId thay đổi
   * Đảm bảo người dùng luôn thấy phần đầu của trang khi vào trang đặt lịch hoặc khi chuyển sang bác sĩ khác
   */
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  /**
   * Thiết lập polling để refresh doctor data mỗi 30 giây
   * Chỉ khi đang ở trang Appointment
   */
  useEffect(() => {
    // Bắt đầu polling
    pollingIntervalRef.current = setInterval(() => {
      refreshDoctorData();
    }, 30000); // 30 giây

    // Cleanup khi component unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [refreshDoctorData]);

  /**
   * Refresh data khi user quay lại trang (window focus)
   */
  useEffect(() => {
    const handleWindowFocus = () => {
      refreshDoctorData();
    };

    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [refreshDoctorData]);

  /**
   * Tự động ẩn thông báo sau 5 giây
   */
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: "", type: "" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Hiển thị loading nếu chưa có thông tin bác sĩ
  if (!doctor) return <div className="py-10 text-center">Đang tải...</div>;

  /**
   * Lọc danh sách bác sĩ liên quan
   * Bao gồm các bác sĩ cùng chuyên khoa nhưng khác ID với bác sĩ hiện tại
   */
  const relatedDoctors = doctors.filter(
    (d) => d.speciality === doctor.speciality && d._id !== doctor._id,
  );

  return (
    <div className="py-8">
      {/* Section hiển thị thông tin bác sĩ */}
      <div className="flex sm:flex-row flex-col gap-4">
        {/* Hình ảnh bác sĩ */}
        <div>
          <img
            alt={doctor.name}
            className="bg-primary rounded-lg w-full sm:max-w-72"
            src={doctor.image}
          />
        </div>

        {/* Thông tin chi tiết bác sĩ */}
        <div className="flex-1 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 p-8 py-7 border border-[#ADADAD] rounded-lg">
          {/* Tên bác sĩ kèm icon xác thực */}
          <p className="flex items-center gap-2 font-medium text-gray-700 text-3xl">
            {doctor.name}{" "}
            <img alt="verified" className="w-5" src={assets.verified_icon} />
          </p>

          {/* Bằng cấp, chuyên khoa và kinh nghiệm */}
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {doctor.degree} - {doctor.speciality}
            </p>
            <button
              className="px-2 py-0.5 border rounded-full text-xs"
              type="button"
            >
              {doctor.experience}
            </button>
          </div>

          {/* Phần giới thiệu về bác sĩ */}
          <div>
            <p className="flex items-center gap-1 mt-3 font-medium text-[#262626] text-sm">
              Giới thiệu{" "}
              <img alt="info" className="w-3" src={assets.info_icon} />
            </p>
            <p className="mt-1 max-w-[700px] text-gray-600 text-sm">
              {doctor.about}
            </p>
          </div>

          {/* Phí đặt lịch hẹn */}
          <p className="mt-4 font-medium text-gray-600">
            Phí đặt lịch:{" "}
            <span className="text-gray-800">{formatCurrency(doctor.fees)}</span>
          </p>
        </div>
      </div>

      {/* Section chọn khung giờ đặt lịch */}
      <div className="mt-8 sm:ml-72 sm:pl-4 font-medium text-[#565656]">
        <p>Chọn khung giờ</p>

        {/* Hiển thị thống kê slots cho ngày được chọn */}
        {slots[slotIndex] &&
          slots[slotIndex].length > 0 &&
          slots[slotIndex][0]?.datetime && (
            <div className="mt-2 text-gray-600 text-sm">
              {(() => {
                const selectedDate = slots[slotIndex][0].datetime
                  .toISOString()
                  .split("T")[0];
                const totalSlots = slots[slotIndex].length;
                const bookedSlots = slots[slotIndex].filter(
                  (slot) => !isSlotAvailable(selectedDate, slot.time),
                ).length;
                const availableSlots = totalSlots - bookedSlots;

                return (
                  <p>
                    Còn lại{" "}
                    <span className="font-semibold text-green-600">
                      {availableSlots}
                    </span>{" "}
                    / {totalSlots} khung giờ
                    {bookedSlots > 0 && (
                      <span className="text-red-500">
                        {" "}
                        ({bookedSlots} đã đặt)
                      </span>
                    )}
                  </p>
                );
              })()}
            </div>
          )}

        {/* Danh sách các ngày có thể chọn (7 ngày tiếp theo) */}
        <div className="flex flex-wrap items-center gap-3 mt-4 w-full">
          {slots.length > 0 &&
            slots.map((slotGroup, index) => {
              // Kiểm tra slotGroup có phần tử và phần tử đầu tiên có datetime không
              if (!slotGroup || !slotGroup[0] || !slotGroup[0].datetime) {
                return null;
              }

              // Lấy ngày từ slot đầu tiên trong nhóm
              const slotDate = new Date(slotGroup[0].datetime);
              // Tạo key duy nhất cho mỗi button ngày
              const dateKey = `${slotDate.getTime()}-${index}`;
              // Kiểm tra có phải ngày hôm nay không
              const isToday = index === 0;

              return (
                <button
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-[#DDDDDD] hover:border-primary hover:text-primary"
                  } ${isToday ? "ring-2 ring-primary/20" : ""}`}
                  key={dateKey}
                  onClick={() => {
                    setSlotIndex(index);
                    // Reset selected time when changing day
                    setSlotTime("");
                  }}
                  onKeyDown={(e) => {
                    // Hỗ trợ điều hướng bằng bàn phím (Enter hoặc Space)
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSlotIndex(index);
                      setSlotTime("");
                    }
                  }}
                  title={isToday ? "Hôm nay" : ""}
                  type="button"
                >
                  {/* Hiển thị thứ trong tuần */}
                  <p className={isToday ? "font-semibold" : ""}>
                    {daysOfWeek[slotDate.getDay()]}
                  </p>
                  {/* Hiển thị ngày trong tháng */}
                  <p className={isToday ? "font-semibold" : ""}>
                    {slotDate.getDate()}
                  </p>
                  {isToday && <p className="mt-1 text-xs">Hôm nay</p>}
                </button>
              );
            })}
        </div>

        {/* Danh sách các giờ có thể chọn trong ngày đã chọn */}
        <div className="flex flex-wrap items-center gap-3 mt-4 w-full">
          {slots[slotIndex]?.map((slot) => {
            // Tạo key duy nhất cho mỗi button giờ
            const timeKey = `${slot.datetime.getTime()}-${slot.time}`;
            // Format ngày theo định dạng YYYY-MM-DD để kiểm tra availability
            const slotDate = slot.datetime.toISOString().split("T")[0];
            const available = isSlotAvailable(slotDate, slot.time);

            return (
              <button
                className={`text-sm font-light shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all ${
                  !available
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                    : slotTime === slot.time
                      ? "bg-primary text-white"
                      : "text-[#949494] border border-[#B4B4B4] hover:border-primary hover:text-primary"
                }`}
                disabled={!available}
                key={timeKey}
                onClick={() => available && setSlotTime(slot.time)}
                onKeyDown={(e) => {
                  // Hỗ trợ điều hướng bằng bàn phím (Enter hoặc Space)
                  if ((e.key === "Enter" || e.key === " ") && available) {
                    e.preventDefault();
                    setSlotTime(slot.time);
                  }
                }}
                title={!available ? "Slot này đã được đặt" : ""}
                type="button"
              >
                {slot.time}
                {!available && <span className="ml-1 text-xs">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Hiển thị thông báo */}
        {notification.message && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Nút đặt lịch hẹn - chỉ enable khi đã chọn giờ và không đang loading */}
        <button
          className="bg-primary hover:bg-primary/90 disabled:opacity-50 my-6 px-20 py-3 rounded-full font-light text-white text-sm transition-all disabled:cursor-not-allowed"
          disabled={!slotTime || isBooking}
          onClick={handleBookAppointment}
          type="button"
        >
          {isBooking ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <title>Đang tải</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  fill="none"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              Đang đặt lịch...
            </span>
          ) : (
            "Đặt lịch hẹn"
          )}
        </button>
      </div>

      {/* Component hiển thị danh sách bác sĩ liên quan */}
      <RelatedDoctors relatedDoctors={relatedDoctors} />
    </div>
  );
};

export default Appointment;
