import mongoose from "mongoose";

// Schema cho quản trị viên (Admin)
const adminSchema = new mongoose.Schema({
  // Email quản trị viên (bắt buộc và phải duy nhất)
  email: { required: true, type: String, unique: true },
  // Mật khẩu (bắt buộc)
  password: { required: true, type: String },
});

const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSchema);

export default adminModel;
