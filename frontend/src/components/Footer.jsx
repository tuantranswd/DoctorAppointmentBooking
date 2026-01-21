import { assets } from "../assets/assets_frontend/assets";

/**
 * Component Footer - Hiển thị footer của trang web
 * Component này chứa thông tin về công ty, các liên kết điều hướng,
 * thông tin liên hệ và bản quyền
 */
const Footer = () => {
  return (
    <div>
      {/* Container chính của footer với responsive margin */}
      {/* Grid layout chứa các phần thông tin của footer */}
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        {/* Phần giới thiệu công ty với logo và mô tả */}
        <div>
          {/* Logo của công ty */}
          <img alt="" className="mb-5 w-40" src={assets.logo} />
          {/* Mô tả về dịch vụ đặt lịch hẹn với bác sĩ */}
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Chúng tôi là nền tảng đặt lịch hẹn với bác sĩ uy tín, giúp bạn kết
            nối dễ dàng với hơn 100+ bác sĩ chuyên khoa hàng đầu. Đặt lịch hẹn
            nhanh chóng, tiện lợi và đáng tin cậy cho mọi nhu cầu chăm sóc sức
            khỏe của bạn.
          </p>
        </div>
        {/* Phần menu điều hướng công ty */}
        <div>
          {/* Tiêu đề phần công ty */}
          <p className="mb-5 font-medium text-xl">CÔNG TY</p>
          {/* Danh sách các liên kết điều hướng */}
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Trang chủ</li>
            <li>Về chúng tôi</li>
            <li>Giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        {/* Phần thông tin liên hệ */}
        <div>
          {/* Tiêu đề phần liên hệ */}
          <p className="mb-5 font-medium text-xl">LIÊN HỆ</p>
          {/* Danh sách thông tin liên hệ */}
          <ul className="flex flex-col gap-2 text-gray-600">
            {/* Số điện thoại liên hệ */}
            <li>+84 848 995 246</li>
            {/* Email liên hệ */}
            <li>tuantran.swd@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Phần bản quyền ở cuối footer */}
      <div>
        {/* Đường kẻ ngăn cách */}
        <hr />
        {/* Thông tin bản quyền */}
        <p className="py-5 text-sm text-center">
          Bản quyền 2026 @ Trần Anh Tuấn - Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default Footer;
