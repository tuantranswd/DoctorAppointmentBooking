import { CalendarCheck, Stethoscope, User, X } from "lucide-react";

const Dashboard = () => {
  // Component Dashboard hiển thị trang tổng quan với thống kê và danh sách lịch hẹn gần đây
  // Dữ liệu giả lập cho danh sách
  const appointments = Array.from({ length: 5 }, (_, index) => ({
    bookingDate: "Đặt lịch vào ngày 24 tháng 7, 2024",
    doctorName: "Dr. Richard James",
    id: index + 1,
    image: "https://randomuser.me/api/portraits/thumb/women/44.jpg", // Placeholder avatar
  }));

  return (
    <div className="bg-[#F8F9FD] p-6 w-full min-h-screen">
      {/* 1. Phần Thẻ Thống kê */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-8">
        {/* Thẻ 1: Bác sĩ */}
        <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-gray-100 rounded-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="bg-[#F2F3FF] p-3 rounded-lg text-[#5F6FFF]">
            <Stethoscope size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-2xl">14</h3>
            <p className="text-gray-500 text-sm">Bác sĩ</p>
          </div>
        </div>

        {/* Thẻ 2: Lịch hẹn */}
        <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-gray-100 rounded-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="bg-[#F2F3FF] p-3 rounded-lg text-[#5F6FFF]">
            <CalendarCheck size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-2xl">2</h3>
            <p className="text-gray-500 text-sm">Lịch hẹn</p>
          </div>
        </div>

        {/* Thẻ 3: Bệnh nhân */}
        <div className="flex items-center gap-4 bg-white shadow-sm p-4 border border-gray-100 rounded-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="bg-[#F2F3FF] p-3 rounded-lg text-[#5F6FFF]">
            <User size={28} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-2xl">5</h3>
            <p className="text-gray-500 text-sm">Bệnh nhân</p>
          </div>
        </div>
      </div>

      {/* 2. Phần Lịch hẹn Gần đây */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-lg max-w-lg">
        <div className="flex items-center gap-2 p-4 border-gray-100 border-b">
          <CalendarCheck className="text-[#5F6FFF]" size={18} />
          <h2 className="font-semibold text-gray-700">Lịch hẹn gần đây</h2>
        </div>

        <div className="flex flex-col">
          {appointments.map((item) => (
            <div
              className="flex justify-between items-center hover:bg-gray-50 p-4 border-gray-50 last:border-0 border-b transition-colors"
              key={item.id}
            >
              <div className="flex items-center gap-3">
                <img
                  alt="Bác sĩ"
                  className="bg-gray-200 rounded-full w-10 h-10 object-cover"
                  src={item.image}
                />
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {item.doctorName}
                  </p>
                  <p className="mt-0.5 text-gray-500 text-xs">
                    {item.bookingDate}
                  </p>
                </div>
              </div>

              {/* Nút Hủy */}
              <button
                className="flex justify-center items-center bg-red-50 hover:bg-red-100 rounded-full w-8 h-8 text-red-500 transition-colors"
                type="button"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
