import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

/**
 * Component hiển thị menu các chuyên khoa dạng icon tròn
 * Cho phép người dùng tìm kiếm bác sĩ theo chuyên khoa
 */
const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-[#262626]"
      id="speciality"
    >
      {/* Tiêu đề section */}
      <h1 className="font-medium text-3xl">Tìm kiếm theo chuyên khoa</h1>

      {/* Mô tả ngắn gọn về chức năng */}
      <p className="sm:w-1/3 text-sm text-center">
        Duyệt qua danh sách bác sĩ uy tín của chúng tôi và đặt lịch hẹn một cách
        dễ dàng.
      </p>

      {/* Danh sách các chuyên khoa dạng icon tròn */}
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll hide-scrollbar">
        {specialityData.map((item) => (
          <Link
            className="flex flex-col items-center text-xs transition-all hover:translate-y-[-10px] duration-500 cursor-pointer shrink-0"
            key={item.speciality}
            to={`/doctors/${item.speciality}`}
          >
            {/* Icon chuyên khoa */}
            <img
              alt={item.speciality}
              className="mb-2 w-16 sm:w-24"
              src={item.image}
            />
            {/* Tên chuyên khoa */}
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
