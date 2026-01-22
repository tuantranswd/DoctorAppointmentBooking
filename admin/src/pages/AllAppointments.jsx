import { useEffect, useState } from "react";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Giả lập lấy dữ liệu từ Backend
  useEffect(() => {
    // Dữ liệu mẫu giống trong hình
    const mockData = [
      {
        dateTime: "24th July, 2024, 10:00 AM",
        department: "General Physician",
        doctorImage: "https://via.placeholder.com/150", // Thay bằng URL thật
        doctorName: "Dr. Richard James",
        fees: 50,
        id: 1,
        patientAge: 28,
        patientImage: "https://via.placeholder.com/150", // Thay bằng URL thật
        patientName: "Richard James",
      },
      {
        dateTime: "24th July, 2024, 11:00 AM",
        department: "General Physician",
        doctorImage: "https://via.placeholder.com/150",
        doctorName: "Dr. Richard James",
        fees: 50,
        id: 2,
        patientAge: 28,
        patientImage: "https://via.placeholder.com/150",
        patientName: "Richard James",
      },
      // Thêm dữ liệu mẫu để test scroll
      {
        dateTime: "25th July, 2024, 09:30 AM",
        department: "General Physician",
        doctorImage: "https://via.placeholder.com/150",
        doctorName: "Dr. Richard James",
        fees: 50,
        id: 3,
        patientAge: 28,
        patientImage: "https://via.placeholder.com/150",
        patientName: "Richard James",
      },
    ];
    setAppointments(mockData);
  }, []);

  // Xử lý khi bấm nút hủy (dấu X)
  const cancelAppointment = (id) => {
    // Logic gọi API xóa/hủy
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white p-5 border-l w-full h-screen">
      {/* Tiêu đề trang */}
      <p className="mb-5 font-medium text-gray-900 text-lg">Tất cả lịch hẹn</p>

      {/* Container của bảng */}
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
          <p className="font-medium text-gray-600"></p>{" "}
          {/* Cột cho nút Action */}
        </div>

        {/* Data Rows */}
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_1fr_3fr_3fr_1fr_1fr] hover:bg-gray-50 px-6 py-3 border-b text-gray-500 transition-colors"
            key={item.id}
          >
            {/* Index: Ẩn trên mobile để tiết kiệm chỗ */}
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2 w-full">
              <img
                alt=""
                className="rounded-full w-8 h-8 object-cover"
                src={item.patientImage}
              />
              <span className="font-medium text-gray-800 truncate">
                {item.patientName}
              </span>
            </div>

            {/* Department */}
            <p className="max-sm:hidden">{item.department}</p>

            {/* Age */}
            <p className="max-sm:hidden">{item.patientAge}</p>

            {/* Date & Time */}
            <p className="text-sm">{item.dateTime}</p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2 w-full">
              <img
                alt=""
                className="bg-gray-200 rounded-full w-8 h-8 object-cover"
                src={item.doctorImage}
              />
              <span className="text-gray-800 truncate">{item.doctorName}</span>
            </div>

            {/* Fees */}
            <p className="font-medium text-gray-800">${item.fees}</p>

            {/* Action Button (Cancel) */}
            <div className="flex justify-end">
              <button
                className="flex justify-center items-center bg-white hover:bg-red-50 shadow-sm pb-1 border border-red-100 hover:border-red-300 rounded-full w-10 h-10 text-red-400 hover:text-red-600 text-xl transition-all"
                onClick={() => cancelAppointment(item.id)}
                type="button"
              >
                &times; {/* Ký tự 'x' đẹp */}
              </button>
            </div>
          </div>
        ))}

        {/* Empty State (Optional) */}
        {appointments.length === 0 && (
          <div className="p-10 text-gray-400 text-center">
            Không tìm thấy lịch hẹn nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
