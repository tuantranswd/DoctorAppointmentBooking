import { assets } from "../assets/assets_frontend/assets";

/**
 * Component Contact - Trang liên hệ
 * Hiển thị thông tin liên hệ và cơ hội việc làm
 */
const Contact = () => {
  return (
    <div>
      {/* Tiêu đề trang liên hệ */}
      <div className="pt-10 text-[#707070] text-2xl text-center">
        <p>
          LIÊN <span className="font-semibold text-gray-700">HỆ</span>
        </p>
      </div>

      {/* Container chính chứa hình ảnh và thông tin liên hệ */}
      <div className="flex md:flex-row flex-col justify-center gap-10 my-10 mb-28 text-sm">
        {/* Hình ảnh liên hệ */}
        <img
          alt="Hình ảnh liên hệ"
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
        />

        {/* Phần thông tin liên hệ */}
        <div className="flex flex-col justify-center items-start gap-6">
          {/* Tiêu đề văn phòng */}
          <p className="font-semibold text-gray-600 text-lg">
            VĂN PHÒNG CỦA CHÚNG TÔI
          </p>
          {/* Địa chỉ văn phòng */}
          <p className="text-gray-500">
            Số 17, Đường Nguyễn Văn Linh <br /> Phường Tân Thuận Tây, Quận 7,
            TP. Hồ Chí Minh
          </p>
          {/* Thông tin liên hệ: số điện thoại và email */}
          <p className="text-gray-500">
            Tel: +84 848 995 246 <br /> Email: tuantran.swd@gmail.com
          </p>
          {/* Tiêu đề phần tuyển dụng */}
          <p className="font-semibold text-gray-600 text-lg">
            TUYỂN DỤNG TẠI PRESCRIPTO
          </p>
          {/* Mô tả về cơ hội việc làm */}
          <p className="text-gray-500">
            Tìm hiểu thêm về các đội ngũ và cơ hội việc làm của chúng tôi.
          </p>
          {/* Nút khám phá việc làm */}
          <button
            className="hover:bg-black px-8 py-4 border border-black hover:text-white text-sm transition-all duration-500"
            type="button"
          >
            Khám Phá Việc Làm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
