import express from "express";
import multer from "multer";
import { addDoctor, loginAdmin } from "../controllers/adminController.js";
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

export default adminRouter;
