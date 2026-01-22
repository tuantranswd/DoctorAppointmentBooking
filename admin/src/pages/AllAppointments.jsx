import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAppointments, cancelAppointmentByAdmin } = useAdminContext();

  // Fetch dữ liệu từ API khi component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Hàm fetch danh sách appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getAppointments();
      
      if (result.success) {
        setAppointments(result.appointments || []);
      } else {
        setError(result.message || "Không thể tải danh sách lịch hẹn");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải dữ liệu");
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Tính tuổi từ ngày sinh
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Format ngày giờ theo định dạng "DD Tháng MM YYYY | HH:MM"
  const formatDateTime = (slotDate, slotTime) => {
    if (!slotDate || !slotTime) return "N/A";
    
    try {
      const date = new Date(slotDate);
      const months = [
        "Tháng 01", "Tháng 02", "Tháng 03", "Tháng 04", "Tháng 05", "Tháng 06",
        "Tháng 07", "Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"
      ];
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year} | ${slotTime}`;
    } catch (err) {
      return `${slotDate} | ${slotTime}`;
    }
  };

  // Xử lý hủy lịch hẹn
  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?")) {
      return;
    }

    try {
      const result = await cancelAppointmentByAdmin(appointmentId);
      
      if (result.success) {
        // Refresh danh sách sau khi hủy thành công
        await fetchAppointments();
        alert("Hủy lịch hẹn thành công!");
      } else {
        alert(result.message || "Không thể hủy lịch hẹn");
      }
    } catch (err) {
      alert("Đã xảy ra lỗi khi hủy lịch hẹn");
      console.error("Error cancelling appointment:", err);
    }
  };

  return (
    <div className="bg-white p-5 border-l w-full h-screen">
      {/* Tiêu đề trang */}
      <p className="mb-5 font-medium text-gray-900 text-lg">Tất cả lịch hẹn</p>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Đang tải...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchAppointments}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Container của bảng */}
      {!loading && !error && (
        <div className="bg-white border rounded w-full text-sm scrollbar-hide">
          {/* Header Row - Ẩn trên mobile nhỏ, hiện trên tablet trở lên */}
          <div className="hidden sm:grid grid-cols-[0.5fr_3fr_2fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col bg-white px-6 py-3 border-b">
            <p className="font-medium text-gray-600">#</p>
            <p className="font-medium text-gray-600">Bệnh nhân</p>
            <p className="font-medium text-gray-600">Khoa</p>
            <p className="font-medium text-gray-600">Tuổi</p>
            <p className="font-medium text-gray-600">Ngày & Giờ</p>
            <p className="font-medium text-gray-600">Bác sĩ</p>
            <p className="font-medium text-gray-600">Phí</p>
            <p className="font-medium text-gray-600">Action</p>
          </div>

          {/* Data Rows */}
          {appointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_1fr_3fr_3fr_1fr_1fr] hover:bg-gray-50 px-6 py-3 border-b text-gray-500 transition-colors"
              key={item._id}
            >
              {/* Index: Ẩn trên mobile để tiết kiệm chỗ */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient Info */}
              <div className="flex items-center gap-2 w-full">
                <img
                  alt={item.userData?.name || "Patient"}
                  className="rounded-full w-8 h-8 object-cover"
                  src={item.userData?.image || "https://via.placeholder.com/150"}
                />
                <span className="font-medium text-gray-800 truncate">
                  {item.userData?.name || "N/A"}
                </span>
              </div>

              {/* Department (Speciality) */}
              <p className="max-sm:hidden">{item.docData?.speciality || "N/A"}</p>

              {/* Age */}
              <p className="max-sm:hidden">{calculateAge(item.userData?.dob)}</p>

              {/* Date & Time */}
              <p className="text-sm">{formatDateTime(item.slotDate, item.slotTime)}</p>

              {/* Doctor Info */}
              <div className="flex items-center gap-2 w-full">
                <img
                  alt={item.docData?.name || "Doctor"}
                  className="bg-gray-200 rounded-full w-8 h-8 object-cover"
                  src={item.docData?.image || "https://via.placeholder.com/150"}
                />
                <span className="text-gray-800 truncate">{item.docData?.name || "N/A"}</span>
              </div>

              {/* Fees */}
              <p className="font-medium text-gray-800">${item.docData?.fees || item.amount || 0}</p>

              {/* Action Button (Cancel) */}
              <div className="flex justify-end">
                {!item.cancelled ? (
                  <button
                    className="flex justify-center items-center bg-white hover:bg-red-50 shadow-sm pb-1 border border-red-100 hover:border-red-300 rounded-full w-10 h-10 text-red-400 hover:text-red-600 text-xl transition-all"
                    onClick={() => handleCancelAppointment(item._id)}
                    type="button"
                    title="Hủy lịch hẹn"
                  >
                    &times; {/* Ký tự 'x' đẹp */}
                  </button>
                ) : (
                  <span className="text-red-500 text-sm font-medium">Đã hủy</span>
                )}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {appointments.length === 0 && (
            <div className="p-10 text-gray-400 text-center">
              Không tìm thấy lịch hẹn nào.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
