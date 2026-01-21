import jwt from "jsonwebtoken";

// Middleware xác thực Admin (Admin Authentication Middleware)
const authAdmin = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization với format Bearer token
    const authHeader = req.headers.authorization;

    // Kiểm tra xem header Authorization có tồn tại không
    if (!authHeader) {
      return res.json({
        message: "Không có quyền truy cập. Vui lòng đăng nhập",
        success: false,
      });
    }

    // Kiểm tra format Bearer token
    if (!authHeader.startsWith("Bearer ")) {
      return res.json({
        message: "Định dạng token không hợp lệ. Sử dụng Bearer token",
        success: false,
      });
    }

    // Trích xuất token từ chuỗi "Bearer <token>"
    const token = authHeader.substring(7); // Bỏ qua "Bearer " (7 ký tự)

    // Kiểm tra xem token có tồn tại không
    if (!token) {
      return res.json({
        message: "Token không được cung cấp",
        success: false,
      });
    }

    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Gán thông tin admin vào request để sử dụng ở các route tiếp theo
    req.adminId = decoded.id;

    // Cho phép request tiếp tục
    next();
  } catch (error) {
    console.log(error);
    res.json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      success: false,
    });
  }
};

export default authAdmin;
