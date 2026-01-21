import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";

// Script để tạo Admin mặc định trong database
// Chạy file này một lần để tạo tài khoản admin đầu tiên

const createDefaultAdmin = async () => {
  try {
    // Thông tin admin mặc định
    const defaultAdmin = {
      email: "admin@prescripto.com",
      password: "Admin@123",
    };

    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await adminModel.findOne({
      email: defaultAdmin.email,
    });

    if (existingAdmin) {
      console.log("Admin đã tồn tại trong database");
      return;
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultAdmin.password, salt);

    // Tạo admin mới
    const newAdmin = new adminModel({
      email: defaultAdmin.email,
      password: hashedPassword,
    });

    await newAdmin.save();

    console.log("Tạo Admin mặc định thành công!");
    console.log("Email:", defaultAdmin.email);
    console.log("Password:", defaultAdmin.password);
  } catch (error) {
    console.error("Lỗi khi tạo admin:", error);
  }
};

export default createDefaultAdmin;
