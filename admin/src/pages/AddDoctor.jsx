import { ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import { useAppContext } from "../context/AppContext";

const AddDoctor = () => {
  // Lấy các function từ context
  const { addDoctor } = useAdminContext();
  const { formatCurrency } = useAppContext();

  // State lưu trữ dữ liệu form thêm bác sĩ
  const [formData, setFormData] = useState({
    about: "",
    address: { line1: "", line2: "" },
    degree: "",
    email: "",
    experience: "",
    fees: "",
    image: null,
    name: "",
    password: "",
    speciality: "",
  });

  // State lưu trữ URL preview của ảnh đã chọn
  const [imagePreview, setImagePreview] = useState(null);

  // Hàm xử lý thay đổi input, đặc biệt cho trường phí khám
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý riêng cho trường địa chỉ (nested object)
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    }
    // Xử lý riêng cho trường phí khám (chỉ cho phép số)
    else if (name === "fees") {
      // Chỉ lấy số, loại bỏ các ký tự không phải số
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }
    // Xử lý bình thường cho các trường khác
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Hàm xử lý khi người dùng chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Cập nhật file ảnh vào formData
      setFormData((prev) => ({ ...prev, image: file }));
      // Tạo URL preview cho ảnh
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Hàm xử lý submit form để thêm bác sĩ mới
  const handleSubmit = async () => {
    try {
      // Gọi API thêm bác sĩ từ context
      const result = await addDoctor(formData);

      if (result.success) {
        alert("Bác sĩ đã được thêm thành công!");

        // Reset form về trạng thái ban đầu
        setFormData({
          about: "",
          address: { line1: "", line2: "" },
          degree: "",
          email: "",
          experience: "",
          fees: "",
          image: null,
          name: "",
          password: "",
          speciality: "",
        });
        setImagePreview(null);
      } else {
        alert(result.message || "Có lỗi xảy ra khi thêm bác sĩ.");
      }
    } catch (error) {
      console.error("Lỗi khi submit:", error);
      alert("Có lỗi xảy ra khi thêm bác sĩ.");
    }
  };

  return (
    <div className="m-5 w-full max-w-6xl">
      {/* Tiêu đề trang */}
      <p className="mb-3 font-medium text-gray-700 text-lg">Thêm Bác Sĩ</p>

      <div className="bg-white shadow-sm px-8 py-8 border border-gray-200 rounded-lg w-full">
        {/* Phần tải lên ảnh bác sĩ */}
        <div className="flex items-center gap-4 mb-8">
          <label className="cursor-pointer" htmlFor="doc-img">
            <div className="flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full w-24 h-24 overflow-hidden text-gray-400 transition-colors">
              {imagePreview ? (
                <img
                  alt=""
                  className="w-full h-full object-cover"
                  src={imagePreview}
                />
              ) : (
                <User className="text-gray-300" size={40} />
              )}
            </div>
          </label>
          <input
            accept="image/*"
            hidden
            id="doc-img"
            onChange={handleImageChange}
            type="file"
          />
          <p className="text-gray-600 text-sm">
            Tải lên ảnh chân dung <br /> bác sĩ
          </p>
        </div>

        {/* Phần form nhập liệu với 2 cột */}
        <div className="flex lg:flex-row flex-col items-start gap-10 text-gray-600">
          {/* Cột trái - Thông tin cơ bản */}
          <div className="flex flex-col lg:flex-1 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Tên Bác Sĩ</p>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="name"
                onChange={handleInputChange}
                placeholder="Ví dụ: Nguyễn Văn A"
                required
                type="text"
                value={formData.name}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Email Bác Sĩ</p>
              <input
                autoComplete="off"
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="email"
                onChange={handleInputChange}
                placeholder="Ví dụ: nguyenvan.a@example.com"
                required
                type="email"
                value={formData.email}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Mật Khẩu</p>
              <input
                autoComplete="new-password"
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="password"
                onChange={handleInputChange}
                placeholder="Ví dụ: Abc123@xyz"
                required
                type="password"
                value={formData.password}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Kinh Nghiệm</p>
              <div className="relative">
                <select
                  className="bg-white px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none w-full transition-colors appearance-none cursor-pointer"
                  name="experience"
                  onChange={handleInputChange}
                  required
                  value={formData.experience}
                >
                  <option value="">Chọn kinh nghiệm</option>
                  <option value="1 Năm">1 Năm</option>
                  <option value="2 Năm">2 Năm</option>
                  <option value="3 Năm">3 Năm</option>
                  <option value="4 Năm">4 Năm</option>
                  <option value="5 Năm">5 Năm</option>
                  <option value="6 Năm">6 Năm</option>
                  <option value="8 Năm">8 Năm</option>
                  <option value="10 Năm">10 Năm</option>
                </select>
                <ChevronDown
                  className="top-3 right-3 absolute text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Phí Khám</p>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                inputMode="numeric"
                name="fees"
                onChange={handleInputChange}
                placeholder="Ví dụ: 200000"
                required
                type="text"
                value={formData.fees}
              />
              {/* Hiển thị giá trị đã format bên dưới input */}
              {formData.fees && (
                <p className="mt-1 text-gray-500 text-xs">
                  {formatCurrency(Number(formData.fees))}
                </p>
              )}
            </div>
          </div>

          {/* Cột phải - Thông tin chuyên môn */}
          <div className="flex flex-col lg:flex-1 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Chuyên Khoa</p>
              <div className="relative">
                <select
                  className="bg-white px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none w-full transition-colors appearance-none cursor-pointer"
                  name="speciality"
                  onChange={handleInputChange}
                  required
                  value={formData.speciality}
                >
                  <option value="">Chọn chuyên khoa</option>
                  <option value="Bác sĩ đa khoa">Bác sĩ đa khoa</option>
                  <option value="Bác sĩ sản phụ khoa">
                    Bác sĩ sản phụ khoa
                  </option>
                  <option value="Bác sĩ da liễu">Bác sĩ da liễu</option>
                  <option value="Bác sĩ nhi khoa">Bác sĩ nhi khoa</option>
                  <option value="Bác sĩ thần kinh">Bác sĩ thần kinh</option>
                  <option value="Bác sĩ tiêu hóa">Bác sĩ tiêu hóa</option>
                </select>
                <ChevronDown
                  className="top-3 right-3 absolute text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Trình Độ Học Vấn</p>
              <input
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="degree"
                onChange={handleInputChange}
                placeholder="Ví dụ: Tiến sĩ Y khoa"
                required
                type="text"
                value={formData.degree}
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="mb-1 text-gray-600 text-sm">Địa Chỉ</p>
              <input
                className="mb-4 px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="address.line1"
                onChange={handleInputChange}
                placeholder="Ví dụ: 123 Đường ABC, Phường XYZ"
                required
                type="text"
                value={formData.address.line1}
              />
              <input
                className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none transition-colors"
                name="address.line2"
                onChange={handleInputChange}
                placeholder="Ví dụ: Quận 1, TP.HCM"
                type="text"
                value={formData.address.line2}
              />
            </div>
          </div>
        </div>

        {/* Phần giới thiệu về bác sĩ */}
        <div className="flex flex-col gap-1 mt-4 text-gray-600">
          <p className="mb-1 text-gray-600 text-sm">Giới Thiệu Về Bác Sĩ</p>
          <textarea
            className="px-3 py-2 border border-gray-300 focus:border-[#5F6FFF] rounded outline-none w-full placeholder:text-gray-400 transition-colors"
            name="about"
            onChange={handleInputChange}
            placeholder="Ví dụ: Bác sĩ có hơn 10 năm kinh nghiệm trong lĩnh vực y tế, chuyên điều trị các bệnh..."
            required
            rows={5}
            value={formData.about}
          />
        </div>

        {/* Nút submit để thêm bác sĩ */}
        <button
          className="bg-[#5F6FFF] hover:bg-[#4b5bea] shadow-md hover:shadow-lg mt-8 px-10 py-3 rounded-full font-medium text-white text-sm transition-all duration-300"
          onClick={handleSubmit}
          type="button"
        >
          Thêm Bác Sĩ
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;
