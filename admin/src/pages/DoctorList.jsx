import { useEffect, useState } from "react";
import { useAdminContext } from "../context/AdminContext";

const DoctorList = () => {
  // State lưu trữ danh sách bác sĩ từ API
  const [doctors, setDoctors] = useState([]);
  // State quản lý trạng thái loading
  const [loading, setLoading] = useState(true);
  // State lưu trữ thông báo lỗi
  const [error, setError] = useState(null);

  // Hàm thay đổi trạng thái available của bác sĩ
  const changeAvailability = async (docId) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/change-availability",
        {
          body: JSON.stringify({ docId }),
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        },
      );

      const data = await response.json();

      if (data.success) {
        // Cập nhật state local
        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === docId ? { ...doc, available: !doc.available } : doc,
          ),
        );
      } else {
        setError(data.message || "Không thể cập nhật trạng thái");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      setError("Đã xảy ra lỗi khi cập nhật trạng thái");
    }
  };

  // Lấy adminToken từ context để xác thực API
  const { adminToken } = useAdminContext();

  // useEffect để gọi API lấy danh sách bác sĩ khi component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      // Kiểm tra xem admin đã đăng nhập chưa
      if (!adminToken) {
        setError("Vui lòng đăng nhập để xem danh sách bác sĩ");
        setLoading(false);
        return;
      }

      try {
        // Gọi API lấy danh sách bác sĩ
        const response = await fetch(
          "http://localhost:4000/api/admin/doctors",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          },
        );

        const data = await response.json();

        if (data.success) {
          // Cập nhật danh sách bác sĩ vào state
          setDoctors(data.doctors || []);
        } else {
          setError(data.message || "Không thể tải danh sách bác sĩ");
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", err);
        setError("Đã xảy ra lỗi khi kết nối đến server");
      } finally {
        // Tắt trạng thái loading
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [adminToken]);

  return (
    <div className="mx-auto px-4 py-6 w-full">
      {/* Tiêu đề trang danh sách bác sĩ */}
      <h1 className="mb-6 font-medium text-gray-800 text-2xl">Tất cả bác sĩ</h1>

      {/* Hiển thị trạng thái loading */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <p className="text-gray-600">Đang tải danh sách bác sĩ...</p>
        </div>
      )}

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && (
        <div className="bg-red-50 mb-6 p-4 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Container lưới hiển thị danh sách bác sĩ */}
      {!loading && !error && (
        <div className="gap-4 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Duyệt qua danh sách bác sĩ và render từng card */}
          {doctors.map((item) => (
            <button
              className="shadow-sm hover:shadow-md border border-blue-100 rounded-xl overflow-hidden text-left transition-all hover:translate-y-[-10px] duration-500 cursor-pointer"
              key={item._id}
              onClick={() => console.log(`Maps to doctor ${item._id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  console.log(`Maps to doctor ${item._id}`);
                }
              }}
              type="button"
            >
              {/* Phần hiển thị ảnh bác sĩ */}
              <div className="flex justify-center items-end bg-blue-50 w-full h-60 sm:h-52">
                <img
                  alt={item.name}
                  className="hover:bg-blue-100 w-full h-full object-cover object-top transition-colors"
                  src={item.image}
                />
              </div>

              {/* Phần thông tin chi tiết của bác sĩ */}
              <div className="bg-white p-4">
                {/* Switch để thay đổi trạng thái Available của bác sĩ */}
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 text-sm">Đang trống lịch</p>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input
                      checked={item.available}
                      className="sr-only peer"
                      onChange={() => changeAvailability(item._id)}
                      type="checkbox"
                    />
                    {/* Styled switch với Tailwind CSS */}
                    <div className="peer after:top-[2px] after:left-[2px] after:absolute bg-gray-200 after:bg-white peer-checked:bg-blue-600 peer-checked:after:border-white rounded-full after:rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 w-11 after:w-5 h-6 after:h-5 after:content-[''] after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>

                {/* Tên bác sĩ */}
                <p className="mb-1 font-medium text-gray-900 text-lg">
                  {item.name}
                </p>
                {/* Chuyên khoa */}
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
