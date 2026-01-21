import { v2 as cloudinary } from "cloudinary";

// Hàm cấu hình các thông số tài khoản Cloudinary
const connectCloudinary = async () => {
  cloudinary.config({
    // Lấy thông tin xác thực từ các biến môi trường trong file .env
    api_key: process.env.CLOUDINARY_API_KEY, // Mã API Key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Mã Secret bí mật
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Tên vùng chứa (Cloud Name)
  });
};

export default connectCloudinary;
