import cors from "cors";
import express from "express";
import "dotenv/config"; // Tự động nạp các biến môi trường từ file .env
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";

// Cấu hình ứng dụng (App Config)
const app = express();
const port = process.env.PORT || 4000; // Sử dụng cổng từ .env hoặc mặc định là 4000

// Gọi các hàm kết nối đã định nghĩa ở trên
connectDB(); // Kết nối Database
connectCloudinary(); // Cấu hình Cloudinary

// Middleware (Các phần mềm trung gian xử lý yêu cầu)
app.use(express.json()); // Cho phép server đọc dữ liệu định dạng JSON trong body
app.use(cors()); // Cho phép các ứng dụng khách (Frontend) truy cập API (CORS)

// API Endpoints (Các đường dẫn API)
app.get("/", (_req, res) => {
  res.send("API đang hoạt động bình thường");
});

// Khởi động server và lắng nghe các yêu cầu
app.listen(port, () => {
  console.log(`Server đã khởi chạy tại địa chỉ: http://localhost:${port}`);
});
