import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  // Hàm xử lý cuộn mượt đến phần danh sách chuyên khoa
  const scrollToSpeciality = () => {
    const specialitySection = document.getElementById("speciality");
    if (specialitySection) {
      specialitySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Container chính của header với background primary, bo tròn góc và padding
    <div className="flex md:flex-row flex-col flex-wrap bg-primary px-6 md:px-10 lg:px-20 rounded-lg">
      {/* Phần bên trái: Text giới thiệu và nút đặt lịch */}
      <div className="flex flex-col justify-center items-start gap-4 m-auto md:mb-[-30px] py-10 md:py-[10vw] md:w-1/2">
        {/* Tiêu đề chính */}
        <p className="font-semibold text-white text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight">
          Đặt Lịch Khám <br /> Cùng Bác Sĩ Uy Tín
        </p>
        {/* Phần mô tả thêm với icon group profiles */}
        <div className="flex md:flex-row flex-col items-center gap-3 font-light text-white text-sm">
          {/* Hình ảnh minh họa các bác sĩ/người dùng */}
          <img alt="nhóm hồ sơ" className="w-28" src={assets.group_profiles} />
          <p>
            Duyệt qua danh sách đa dạng các bác sĩ uy tín của chúng tôi,{" "}
            <br className="hidden sm:block" />
            đặt lịch hẹn dễ dàng không rắc rối.
          </p>
        </div>
        {/* Nút đặt lịch - cuộn xuống phần chuyên khoa khi click */}
        <button
          className="flex items-center gap-2 bg-white m-auto md:m-0 px-8 py-3 rounded-full text-[#595959] text-sm hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={scrollToSpeciality}
          type="button"
        >
          Đặt lịch khám
          <img alt="mũi tên" className="w-3" src={assets.arrow_icon} />
        </button>
      </div>
      {/* Phần bên phải: Hình ảnh bác sĩ */}
      <div className="relative md:w-1/2">
        <img
          alt="bác sĩ"
          className="bottom-0 md:absolute rounded-lg w-full h-auto"
          src={assets.header_img}
        />
      </div>
    </div>
  );
};

export default Header;
