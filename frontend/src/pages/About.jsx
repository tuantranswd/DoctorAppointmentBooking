import { assets } from "../assets/assets_frontend/assets";

/**
 * Component About - Trang giới thiệu về ứng dụng
 * Hiển thị thông tin về Prescripto và các lý do chọn dịch vụ
 */
const About = () => {
  return (
    <div>
      {/* Tiêu đề trang giới thiệu */}
      <div className="pt-10 text-[#707070] text-2xl text-center">
        <p>
          VỀ <span className="font-semibold text-gray-700">CHÚNG TÔI</span>
        </p>
      </div>

      {/* Phần nội dung chính với hình ảnh và mô tả */}
      <div className="flex md:flex-row flex-col gap-12 my-10">
        {/* Hình ảnh giới thiệu */}
        <img
          alt="Hình ảnh giới thiệu về Prescripto"
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
        />
        {/* Nội dung mô tả về dịch vụ */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm">
          <p>
            Chào mừng bạn đến với Prescripto, đối tác đáng tin cậy của bạn trong
            việc quản lý nhu cầu chăm sóc sức khỏe một cách tiện lợi và hiệu
            quả. Tại Prescripto, chúng tôi hiểu rõ những thách thức mà mọi người
            gặp phải khi đặt lịch hẹn với bác sĩ và quản lý hồ sơ sức khỏe của
            họ.
          </p>
          <p>
            Prescripto cam kết xuất sắc trong công nghệ chăm sóc sức khỏe. Chúng
            tôi không ngừng nỗ lực nâng cao nền tảng của mình, tích hợp những
            tiến bộ mới nhất để cải thiện trải nghiệm người dùng và cung cấp
            dịch vụ vượt trội. Dù bạn đang đặt lịch hẹn đầu tiên hay quản lý
            việc chăm sóc đang diễn ra, Prescripto luôn ở đây để hỗ trợ bạn từng
            bước đi.
          </p>
          {/* Tiêu đề tầm nhìn */}
          <b className="text-gray-800">Tầm Nhìn Của Chúng Tôi</b>
          <p>
            Tầm nhìn của chúng tôi tại Prescripto là tạo ra một trải nghiệm chăm
            sóc sức khỏe liền mạch cho mọi người dùng. Chúng tôi mục tiêu thu
            hẹp khoảng cách giữa bệnh nhân và nhà cung cấp dịch vụ chăm sóc sức
            khỏe, giúp bạn dễ dàng tiếp cận sự chăm sóc bạn cần, khi bạn cần.
          </p>
        </div>
      </div>

      {/* Tiêu đề phần lý do chọn chúng tôi */}
      <div className="my-4 text-xl">
        <p>
          TẠI SAO CHỌN{" "}
          <span className="font-semibold text-gray-700">CHÚNG TÔI</span>
        </p>
      </div>

      {/* Danh sách các lý do chọn dịch vụ */}
      <div className="flex md:flex-row flex-col mb-20">
        {/* Card hiệu quả */}
        <div className="flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer">
          <b>HIỆU QUẢ:</b>
          <p>
            Đặt lịch hẹn được tối ưu hóa phù hợp với lối sống bận rộn của bạn.
          </p>
        </div>

        {/* Card tiện lợi */}
        <div className="flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer">
          <b>TIỆN LỢI:</b>
          <p>
            Tiếp cận mạng lưới các chuyên gia chăm sóc sức khỏe đáng tin cậy
            trong khu vực của bạn.
          </p>
        </div>

        {/* Card cá nhân hóa */}
        <div className="flex flex-col gap-5 hover:bg-primary px-10 md:px-16 py-8 sm:py-16 border text-[15px] text-gray-600 hover:text-white transition-all duration-300 cursor-pointer">
          <b>CÁ NHÂN HÓA:</b>
          <p>
            Đề xuất và nhắc nhở được tùy chỉnh để giúp bạn luôn kiểm soát sức
            khỏe của mình.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
