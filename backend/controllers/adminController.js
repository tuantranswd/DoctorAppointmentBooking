import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";

// API đăng nhập Admin (Admin Login)
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
      return res.json({
        message: "Vui lòng cung cấp email và mật khẩu",
        success: false,
      });
    }

    // Kiểm tra email có hợp lệ không
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Email không hợp lệ",
        success: false,
      });
    }

    // Tìm admin theo email
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token có hiệu lực trong 7 ngày
    });

    res.json({
      message: "Đăng nhập thành công",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// API thêm bác sĩ (Add Doctor)
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Kiểm tra đầy đủ thông tin
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({
        message: "Vui lòng cung cấp đầy đủ thông tin",
        success: false,
      });
    }

    // Kiểm tra email có hợp lệ không
    if (!validator.isEmail(email)) {
      return res.json({
        message: "Email không hợp lệ",
        success: false,
      });
    }

    // Kiểm tra độ mạnh mật khẩu (tối thiểu 8 ký tự)
    if (password.length < 8) {
      return res.json({
        message: "Mật khẩu phải có ít nhất 8 ký tự",
        success: false,
      });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        message: "Email đã được sử dụng",
        success: false,
      });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tải ảnh lên Cloudinary
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Tạo dữ liệu bác sĩ
    const doctorData = {
      about,
      address: JSON.parse(address), // Parse address từ chuỗi JSON
      date: Date.now(),
      degree,
      email,
      experience,
      fees: Number(fees),
      image: imageUrl,
      name,
      password: hashedPassword,
      speciality,
    };

    // Lưu vào database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({
      doctor: {
        email: newDoctor.email,
        id: newDoctor._id,
        name: newDoctor.name,
      },
      message: "Thêm bác sĩ thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// API lấy danh sách tất cả bác sĩ (All Doctors)
const allDoctors = async (_req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      doctors,
      message: "Lấy danh sách bác sĩ thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// API thay đổi trạng thái available của bác sĩ (Change Availability)
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({
      message: "Trạng thái available đã được cập nhật",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

export { addDoctor, allDoctors, changeAvailability, loginAdmin };
