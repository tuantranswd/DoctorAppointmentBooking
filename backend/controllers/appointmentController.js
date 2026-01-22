import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// Đặt lịch hẹn
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;

    // Validate input
    if (!docId || !slotDate || !slotTime) {
      return res.json({
        success: false,
        message: "Thiếu thông tin cần thiết: docId, slotDate, slotTime",
      });
    }

    // Kiểm tra slotDate không phải quá khứ
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    if (slotDate < today) {
      return res.json({
        success: false,
        message: "Không thể đặt lịch cho ngày trong quá khứ",
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
      return res.json({
        success: false,
        message:
          "Thời gian không hợp lệ. Chỉ cho phép từ 08:00 đến 21:00, cách nhau 30 phút",
      });
    }

    // Lấy thông tin user
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }

    // Kiểm tra bác sĩ tồn tại và available
    const doctor = await doctorModel.findById(docId).select("-password");
    if (!doctor) {
      return res.json({
        success: false,
        message: "Bác sĩ không tồn tại",
      });
    }
    if (!doctor.available) {
      return res.json({
        success: false,
        message: "Bác sĩ hiện không khả dụng",
      });
    }

    // Kiểm tra slot chưa được đặt
    const slotsBooked = doctor.slots_booked || {};
    if (slotsBooked[slotDate] && slotsBooked[slotDate].includes(slotTime)) {
      return res.json({
        success: false,
        message: "Slot này đã được đặt",
      });
    }

    // Tạo appointment
    const appointmentData = {
      userId: req.userId,
      docId,
      slotDate,
      slotTime,
      userData: user,
      docData: doctor,
      amount: doctor.fees,
      date: Date.now(),
      cancelled: false,
      payment: false,
      isCompleted: false,
    };

    const appointment = new appointmentModel(appointmentData);
    await appointment.save();

    // Cập nhật slots_booked của bác sĩ
    if (!slotsBooked[slotDate]) {
      slotsBooked[slotDate] = [];
    }
    slotsBooked[slotDate].push(slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

    res.json({
      success: true,
      message: "Đặt lịch hẹn thành công",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi khi đặt lịch hẹn",
    });
  }
};

// Lấy danh sách lịch hẹn của user
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.userId })
      .sort({ date: -1, slotDate: -1, slotTime: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi khi lấy danh sách lịch hẹn",
    });
  }
};

// Hủy lịch hẹn
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({
        success: false,
        message: "Thiếu appointmentId",
      });
    }

    // Tìm appointment
    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      userId: req.userId,
    });

    if (!appointment) {
      return res.json({
        success: false,
        message: "Lịch hẹn không tồn tại hoặc không thuộc về bạn",
      });
    }

    if (appointment.cancelled) {
      return res.json({
        success: false,
        message: "Lịch hẹn đã bị hủy",
      });
    }

    // Kiểm tra slotDate chưa qua
    const today = new Date().toISOString().split("T")[0];
    if (appointment.slotDate < today) {
      return res.json({
        success: false,
        message: "Không thể hủy lịch hẹn đã qua",
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
      success: true,
      message: "Hủy lịch hẹn thành công",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi khi hủy lịch hẹn",
    });
  }
};

// Lấy tất cả lịch hẹn (Admin)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ slotDate: -1, slotTime: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi khi lấy danh sách lịch hẹn",
    });
  }
};

// Hủy lịch hẹn cưỡng bách (Admin)
const cancelAppointmentByAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({
        success: false,
        message: "Thiếu appointmentId",
      });
    }

    // Tìm appointment
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({
        success: false,
        message: "Lịch hẹn không tồn tại",
      });
    }

    if (appointment.cancelled) {
      return res.json({
        success: false,
        message: "Lịch hẹn đã bị hủy",
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
      success: true,
      message: "Hủy lịch hẹn thành công",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi khi hủy lịch hẹn",
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
