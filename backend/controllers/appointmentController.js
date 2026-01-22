import mongoose from "mongoose";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// Đặt lịch hẹn
const bookAppointment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { docId, slotDate, slotTime } = req.body;

    // Validate input
    if (!docId || !slotDate || !slotTime) {
      await session.abortTransaction();
      return res.json({
        message: "Thiếu thông tin cần thiết: docId, slotDate, slotTime",
        success: false,
      });
    }

    // Chuyển đổi slotDate thành Date object
    const slotDateObj = new Date(slotDate);
    if (Number.isNaN(slotDateObj.getTime())) {
      await session.abortTransaction();
      return res.json({
        message: "Định dạng ngày không hợp lệ",
        success: false,
      });
    }

    // Kiểm tra slotDate không phải quá khứ (so sánh chỉ ngày, không giờ)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const slotDateOnly = new Date(slotDateObj);
    slotDateOnly.setHours(0, 0, 0, 0);
    if (slotDateOnly < today) {
      await session.abortTransaction();
      return res.json({
        message: "Không thể đặt lịch cho ngày trong quá khứ",
        success: false,
      });
    }

    // Kiểm tra slotTime hợp lệ (08:00-21:00, cách nhau 30 phút)
    const validTimes = [];
    for (let hour = 8; hour <= 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        validTimes.push(
          `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
        );
      }
    }
    if (!validTimes.includes(slotTime)) {
      await session.abortTransaction();
      return res.json({
        message:
          "Thời gian không hợp lệ. Chỉ cho phép từ 08:00 đến 21:00, cách nhau 30 phút",
        success: false,
      });
    }

    // Lấy thông tin user
    const user = await userModel
      .findById(req.userId)
      .select("-password")
      .session(session);
    if (!user) {
      await session.abortTransaction();
      return res.json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    // Kiểm tra bác sĩ tồn tại và available
    const doctor = await doctorModel
      .findById(docId)
      .select("-password")
      .session(session);
    if (!doctor) {
      await session.abortTransaction();
      return res.json({
        message: "Bác sĩ không tồn tại",
        success: false,
      });
    }
    if (!doctor.available) {
      await session.abortTransaction();
      return res.json({
        message: "Bác sĩ hiện không khả dụng",
        success: false,
      });
    }

    // Kiểm tra lại slot availability (double-check để tránh race condition)
    const slotsBooked = doctor.slots_booked || {};
    const slotDateKey = slotDateObj.toISOString().split("T")[0]; // YYYY-MM-DD format cho key
    if (slotsBooked[slotDateKey]?.includes(slotTime)) {
      await session.abortTransaction();
      return res.json({
        message: "Slot này đã được đặt bởi người khác",
        success: false,
      });
    }

    // Tạo appointment
    const appointmentData = {
      amount: doctor.fees,
      cancelled: false,
      date: Date.now(),
      docData: doctor,
      docId,
      isCompleted: false,
      payment: false,
      slotDate: slotDateObj,
      slotTime,
      userData: user,
      userId: req.userId,
    };

    const appointment = new appointmentModel(appointmentData);
    await appointment.save({ session });

    // Cập nhật slots_booked của bác sĩ
    if (!slotsBooked[slotDateKey]) {
      slotsBooked[slotDateKey] = [];
    }
    slotsBooked[slotDateKey].push(slotTime);
    await doctorModel.findByIdAndUpdate(
      docId,
      { slots_booked: slotsBooked },
      { session },
    );

    await session.commitTransaction();

    res.json({
      appointment,
      message: "Đặt lịch hẹn thành công",
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    res.json({
      message: "Lỗi khi đặt lịch hẹn",
      success: false,
    });
  } finally {
    session.endSession();
  }
};

// Lấy danh sách lịch hẹn của user
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.userId })
      .sort({ date: -1, slotDate: -1, slotTime: -1 });

    res.json({
      appointments,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Lỗi khi lấy danh sách lịch hẹn",
      success: false,
    });
  }
};

// Hủy lịch hẹn
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({
        message: "Thiếu appointmentId",
        success: false,
      });
    }

    // Tìm appointment
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId: req.userId,
    });

    if (!appointment) {
      return res.json({
        message: "Lịch hẹn không tồn tại hoặc không thuộc về bạn",
        success: false,
      });
    }

    if (appointment.cancelled) {
      return res.json({
        message: "Lịch hẹn đã bị hủy",
        success: false,
      });
    }

    // Kiểm tra slotDate chưa qua (so sánh chỉ ngày, không giờ)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const appointmentDate = new Date(appointment.slotDate);
    appointmentDate.setHours(0, 0, 0, 0);
    if (appointmentDate < today) {
      return res.json({
        message: "Không thể hủy lịch hẹn đã qua",
        success: false,
      });
    }

    // Cập nhật appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Xóa slot khỏi slots_booked của bác sĩ
    const doctor = await doctorModel.findById(appointment.docId);
    if (doctor) {
      const slotsBooked = doctor.slots_booked || {};
      const slotDateKey = appointment.slotDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      if (slotsBooked[slotDateKey]) {
        slotsBooked[slotDateKey] = slotsBooked[slotDateKey].filter(
          (time) => time !== appointment.slotTime,
        );
        await doctorModel.findByIdAndUpdate(appointment.docId, {
          slots_booked: slotsBooked,
        });
      }
    }

    res.json({
      message: "Hủy lịch hẹn thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Lỗi khi hủy lịch hẹn",
      success: false,
    });
  }
};

// Lấy tất cả lịch hẹn (Admin)
const getAllAppointments = async (_req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ slotDate: -1, slotTime: -1 });

    res.json({
      appointments,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Lỗi khi lấy danh sách lịch hẹn",
      success: false,
    });
  }
};

// Hủy lịch hẹn cưỡng bách (Admin)
const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({
        message: "Thiếu appointmentId",
        success: false,
      });
    }

    // Tìm appointment
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        message: "Lịch hẹn không tồn tại",
        success: false,
      });
    }

    if (appointment.cancelled) {
      return res.json({
        message: "Lịch hẹn đã bị hủy",
        success: false,
      });
    }

    // Cập nhật appointment
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Xóa slot khỏi slots_booked của bác sĩ
    const doctor = await doctorModel.findById(appointment.docId);
    if (doctor) {
      const slotsBooked = doctor.slots_booked || {};
      if (slotsBooked[appointment.slotDate]) {
        slotsBooked[appointment.slotDate] = slotsBooked[
          appointment.slotDate
        ].filter((time) => time !== appointment.slotTime);
        await doctorModel.findByIdAndUpdate(appointment.docId, {
          slots_booked: slotsBooked,
        });
      }
    }

    res.json({
      message: "Hủy lịch hẹn thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Lỗi khi hủy lịch hẹn",
      success: false,
    });
  }
};

export {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getAllAppointments,
  cancelAppointmentByAdmin,
};
