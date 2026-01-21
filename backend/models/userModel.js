import mongoose from "mongoose";

// Schema cho người dùng (User)
const userSchema = new mongoose.Schema(
  {
    // Địa chỉ của người dùng (gồm 2 dòng)
    address: { default: { line1: "", line2: "" }, type: Object },
    // Ngày sinh (Date of Birth)
    dob: { default: "Not Selected", type: String },
    // Email (bắt buộc và phải duy nhất)
    email: { required: true, type: String, unique: true },
    // Giới tính
    gender: { default: "Not Selected", type: String },
    // Ảnh đại diện (mặc định là ảnh trong suốt)
    image: {
      default:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      type: String,
    },
    // Tên người dùng (bắt buộc)
    name: { required: true, type: String },
    // Mật khẩu (bắt buộc)
    password: { required: true, type: String },
    // Số điện thoại
    phone: { default: "0000000000", type: String },
  },
  { minimize: false }, // Không tối thiểu hóa object rỗng
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
