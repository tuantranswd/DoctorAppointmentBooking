import mongoose from "mongoose";

// Schema cho cuộc hẹn (Appointment)
const appointmentSchema = new mongoose.Schema(
  {
    // ID của user (bắt buộc)
    userId: { required: true, type: String },
    // ID của bác sĩ (bắt buộc)
    docId: { required: true, type: String },
    // Ngày đặt lịch format "YYYY-MM-DD" (bắt buộc)
    slotDate: { required: true, type: String },
    // Giờ đặt lịch format "HH:MM" (bắt buộc)
    slotTime: { required: true, type: String },
    // Lưu toàn bộ thông tin user tại thời điểm đặt lịch (bắt buộc)
    userData: { required: true, type: Object },
    // Lưu toàn bộ thông tin bác sĩ tại thời điểm đặt lịch (bắt buộc)
    docData: { required: true, type: Object },
    // Phí khám bệnh (bắt buộc)
    amount: { required: true, type: Number },
    // Timestamp khi tạo appointment (bắt buộc)
    date: { required: true, type: Number },
    // Trạng thái hủy (mặc định false)
    cancelled: { default: false, type: Boolean },
    // Trạng thái thanh toán (mặc định false)
    payment: { default: false, type: Boolean },
    // Trạng thái hoàn thành (mặc định false)
    isCompleted: { default: false, type: Boolean },
  },
  { minimize: false }, // Không tối thiểu hóa object rỗng
);

// Index trên userId, docId, slotDate, slotTime để tối ưu query
appointmentSchema.index({ userId: 1, docId: 1, slotDate: 1, slotTime: 1 });

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
