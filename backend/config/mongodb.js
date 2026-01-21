import mongoose from "mongoose";

// Hàm khởi tạo kết nối tới cơ sở dữ liệu MongoDB
const connectDB = async () => {
  try {
    // Thiết lập trình lắng nghe sự kiện: khi kết nối thành công sẽ in ra thông báo
    mongoose.connection.on("connected", () => {
      console.log("Cơ sở dữ liệu đã kết nối thành công");
    });

    // Thực hiện kết nối tới MongoDB bằng chuỗi kết nối (URI) lấy từ file .env
    await mongoose.connect(`${process.env.MONGODB_URI}`);
  } catch (error) {
    // Nếu xảy ra lỗi trong quá trình kết nối, in lỗi và dừng server
    console.error("Kết nối cơ sở dữ liệu thất bại:", error.message);
    process.exit(1); // Thoát chương trình với mã lỗi 1
  }
};

export default connectDB;
