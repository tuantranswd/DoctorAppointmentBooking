import { Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

/**
 * Component Banner - Hiển thị banner quảng cáo đặt lịch hẹn với bác sĩ
 * Component này hiển thị một banner với thông tin về dịch vụ đặt lịch hẹn
 * và nút kêu gọi hành động để người dùng tạo tài khoản
 */
const Banner = () => {
  return (
    <div className="flex bg-primary md:mx-10 my-20 px-6 sm:px-10 md:px-14 lg:px-12 rounded-lg">
      {/* Container chính của banner với background màu primary và responsive padding/margin */}
      {/* Phần nội dung bên trái chứa text và button */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        {/* Container chứa tiêu đề và mô tả */}
        <div className="font-semibold text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {/* Tiêu đề chính của banner */}
          <p>Đặt lịch hẹn</p>
          {/* Mô tả về số lượng bác sĩ */}
          <p className="mt-4">Với hơn 100+ Bác sĩ đáng tin cậy</p>
        </div>
        {/* Link điều hướng đến trang đăng nhập */}
        <Link to="/login">
          {/* Nút kêu gọi hành động với hiệu ứng hover */}
          <button
            className="bg-white mt-6 px-8 py-3 rounded-full text-[#595959] text-sm sm:text-base hover:scale-105 transition-all cursor-pointer"
            type="button"
          >
            Tạo tài khoản
          </button>
        </Link>
      </div>
      {/* Phần hình ảnh bên phải, chỉ hiển thị trên màn hình medium trở lên */}
      <div className="hidden md:block relative md:w-1/2 lg:w-[370px]">
        {/* Hình ảnh minh họa cho banner */}
        <img
          alt=""
          className="right-0 bottom-0 absolute w-full max-w-md"
          src={assets.appointment_img}
        />
      </div>
    </div>
  );
};

export default Banner;
