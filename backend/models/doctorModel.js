import mongoose from "mongoose";

// Schema cho bác sĩ (Doctor)
const doctorSchema = new mongoose.Schema(
  {
    // Thông tin giới thiệu về bác sĩ (bắt buộc)
    about: { required: true, type: String },
    // Địa chỉ phòng khám (bắt buộc)
    address: { required: true, type: Object },
    // Trạng thái sẵn sàng khám bệnh (mặc định là có)
    available: { default: true, type: Boolean },
    // Ngày đăng ký (dạng timestamp)
    date: { required: true, type: Number },
    // Bằng cấp (bắt buộc)
    degree: { required: true, type: String },
    // Email (bắt buộc và phải duy nhất)
    email: { required: true, type: String, unique: true },
    // Số năm kinh nghiệm (bắt buộc)
    experience: { required: true, type: String },
    // Phí khám bệnh (bắt buộc)
    fees: { required: true, type: Number },
    // Ảnh đại diện của bác sĩ (bắt buộc)
    image: { required: true, type: String },
    // Tên bác sĩ (bắt buộc)
    name: { required: true, type: String },
    // Mật khẩu (bắt buộc)
    password: { required: true, type: String },
    // Các khung giờ đã được đặt (mặc định là object rỗng)
    slots_booked: { default: {}, type: Object },
    // Chuyên khoa (bắt buộc)
    speciality: { required: true, type: String },
  },
  { minimize: false }, // Không tối thiểu hóa object rỗng
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
