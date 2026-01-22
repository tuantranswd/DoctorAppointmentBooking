import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

// API đăng ký người dùng (User Signup)
const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra đầu vào
    if (!name || !email || !password) {
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
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "Email đã được sử dụng",
        success: false,
      });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo dữ liệu người dùng
    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    // Lưu vào database
    const newUser = new userModel(userData);
    await newUser.save();

    // Tạo JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token có hiệu lực trong 7 ngày
    });

    res.json({
      message: "Đăng ký thành công",
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

// API đăng nhập người dùng (User Login)
const loginUser = async (req, res) => {
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

    // Tìm người dùng theo email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

// API lấy thông tin hồ sơ người dùng (Get User Profile)
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    // Tìm người dùng theo ID và loại bỏ trường password
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    res.json({
      message: "Lấy thông tin hồ sơ thành công",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// API cập nhật hồ sơ người dùng (Update User Profile)
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Tải ảnh lên Cloudinary nếu có
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // Chuẩn bị dữ liệu cập nhật
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = JSON.parse(address); // Parse address từ chuỗi JSON
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;
    if (imageUrl) updateData.image = imageUrl;

    // Cập nhật thông tin người dùng
    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
      })
      .select("-password");

    if (!updatedUser) {
      return res.json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    res.json({
      message: "Cập nhật hồ sơ thành công",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
      success: false,
    });
  }
};

export { signupUser, loginUser, getProfile, updateProfile };
