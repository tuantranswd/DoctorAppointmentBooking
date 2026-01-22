import express from "express";
import multer from "multer";
import { allDoctors } from "../controllers/adminController.js";
import {
  bookAppointment,
  cancelAppointment,
  getMyAppointments,
} from "../controllers/appointmentController.js";
import {
  getProfile,
  loginUser,
  signupUser,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

// Cấu hình multer để xử lý file upload
const storage = multer.diskStorage({
  filename: (_req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route đăng ký người dùng (public)
userRouter.post("/signup", signupUser);

// Route đăng nhập người dùng (public)
userRouter.post("/login", loginUser);

// Route lấy danh sách bác sĩ (public)
userRouter.get("/get-doctors", allDoctors);

// Route lấy hồ sơ người dùng (protected, authUser)
userRouter.get("/get-profile", authUser, getProfile);

// Route cập nhật hồ sơ người dùng (protected, authUser, multer upload)
userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile,
);

// Route đặt lịch hẹn (protected, authUser)
userRouter.post("/book-appointment", authUser, bookAppointment);

// Route lấy danh sách lịch hẹn của tôi (protected, authUser)
userRouter.get("/my-appointments", authUser, getMyAppointments);

// Route hủy lịch hẹn (protected, authUser)
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
