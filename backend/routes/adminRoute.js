import express from "express";
import multer from "multer";
import {
  addDoctor,
  allDoctors,
  changeAvailability,
  loginAdmin,
} from "../controllers/adminController.js";
import {
  cancelAppointmentByAdmin,
  getAllAppointments,
} from "../controllers/appointmentController.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

// Cấu hình multer để xử lý file upload
const storage = multer.diskStorage({
  filename: (_req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route đăng nhập Admin (không cần xác thực)
adminRouter.post("/login", loginAdmin);

// Route thêm bác sĩ (cần xác thực Admin)
// upload.single("image") xử lý file ảnh với field name là "image"
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// Route lấy danh sách tất cả bác sĩ (cần xác thực Admin)
adminRouter.get("/doctors", authAdmin, allDoctors);

// Route thay đổi trạng thái available của bác sĩ (cần xác thực Admin)
adminRouter.post("/change-availability", authAdmin, changeAvailability);

// Route lấy tất cả lịch hẹn (cần xác thực Admin)
adminRouter.get("/appointments", authAdmin, getAllAppointments);

// Route hủy lịch hẹn cưỡng bách (cần xác thực Admin)
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointmentByAdmin);

export default adminRouter;
