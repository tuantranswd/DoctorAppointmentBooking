import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script để seed dữ liệu bác sĩ mặc định vào database
// Chỉ chạy khi database rỗng (chưa có bác sĩ nào)

/**
 * Danh sách bác sĩ mẫu để seed vào database
 * Dữ liệu được lấy từ file assets_frontend/assets.js
 */
const doctorsData = [
  {
    _id: "doc1",
    about:
      "Bác sĩ chuyên về y học đa khoa với nhiều năm kinh nghiệm trong việc chẩn đoán và điều trị các bệnh lý thông thường. Tập trung vào y học dự phòng, tầm soát sức khỏe định kỳ và tư vấn lối sống lành mạnh giúp bệnh nhân phòng ngừa bệnh tật hiệu quả.",
    address: {
      line1: "Số 17, Đường Nguyễn Văn Linh",
      line2: "Phường Tân Thuận Tây, Quận 7, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "nguyenvanan@prescripto.com",
    experience: "4 Năm",
    fees: 200000,
    image: "doc1.png",
    name: "Bác sĩ Nguyễn Văn An",
    password: "Doctor@123",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc2",
    about:
      "Bác sĩ chuyên khoa sản phụ khoa với chuyên môn sâu về sức khỏe phụ nữ, chăm sóc thai sản và các vấn đề sinh sản. Cung cấp dịch vụ khám thai định kỳ, tư vấn tiền thụ thai và điều trị các bệnh lý phụ khoa.",
    address: {
      line1: "Số 27, Đường Nguyễn Thị Minh Khai",
      line2: "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "tranthilan@prescripto.com",
    experience: "3 Năm",
    fees: 250000,
    image: "doc2.png",
    name: "Bác sĩ Trần Thị Lan",
    password: "Doctor@123",
    speciality: "Bác sĩ sản phụ khoa",
  },
  {
    _id: "doc3",
    about:
      "Bác sĩ da liễu chuyên về chẩn đoán và điều trị các bệnh lý về da, tóc và móng. Kinh nghiệm trong điều trị mụn trứng cá, eczema, viêm da, nấm da và các vấn đề thẩm mỹ da.",
    address: {
      line1: "Số 37, Đường 3/2",
      line2: "Phường 11, Quận 10, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "levanminh@prescripto.com",
    experience: "1 Năm",
    fees: 150000,
    image: "doc3.png",
    name: "Bác sĩ Lê Văn Minh",
    password: "Doctor@123",
    speciality: "Bác sĩ da liễu",
  },
  {
    _id: "doc4",
    about:
      "Bác sĩ nhi khoa chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến tuổi thiếu niên. Tập trung vào theo dõi phát triển, tiêm chủng, điều trị các bệnh lý nhi khoa thường gặp và tư vấn dinh dưỡng cho trẻ.",
    address: {
      line1: "Số 47, Đường Lê Văn Sỹ",
      line2: "Phường 14, Quận 3, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "phamvanbinh@prescripto.com",
    experience: "2 Năm",
    fees: 180000,
    image: "doc4.png",
    name: "Bác sĩ Phạm Văn Bình",
    password: "Doctor@123",
    speciality: "Bác sĩ nhi khoa",
  },
  {
    _id: "doc5",
    about:
      "Bác sĩ chuyên khoa thần kinh với chuyên môn về các bệnh lý hệ thần kinh trung ương và ngoại biên. Kinh nghiệm trong điều trị đau đầu, đau nửa đầu, đột quỵ, Parkinson, động kinh và các rối loạn thần kinh khác.",
    address: {
      line1: "Số 57, Đường Võ Văn Tần",
      line2: "Phường 6, Quận 3, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "hoangthiha@prescripto.com",
    experience: "4 Năm",
    fees: 300000,
    image: "doc5.png",
    name: "Bác sĩ Hoàng Thị Hà",
    password: "Doctor@123",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc6",
    about:
      "Bác sĩ chuyên khoa tiêu hóa với chuyên môn sâu về chẩn đoán và điều trị các bệnh lý đường tiêu hóa. Đặc biệt quan tâm đến các bệnh lý như viêm loét dạ dày tá tràng, trào ngược dạ dày thực quản, hội chứng ruột kích thích và các rối loạn tiêu hóa khác.",
    address: {
      line1: "Số 67, Đường Điện Biên Phủ",
      line2: "Phường 17, Quận Bình Thạnh, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "dovancuong@prescripto.com",
    experience: "4 Năm",
    fees: 280000,
    image: "doc6.png",
    name: "Bác sĩ Đỗ Văn Cường",
    password: "Doctor@123",
    speciality: "Bác sĩ tiêu hóa",
  },
  {
    _id: "doc7",
    about:
      "Bác sĩ đa khoa với phương châm lấy bệnh nhân làm trung tâm, cung cấp dịch vụ chăm sóc sức khỏe toàn diện cho mọi lứa tuổi. Kinh nghiệm trong khám và điều trị các bệnh lý nội khoa thông thường và tư vấn sức khỏe tổng quát.",
    address: {
      line1: "Số 77, Đường Nguyễn Đình Chiểu",
      line2: "Phường 6, Quận 3, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "vuvanduc@prescripto.com",
    experience: "4 Năm",
    fees: 220000,
    image: "doc7.png",
    name: "Bác sĩ Vũ Văn Đức",
    password: "Doctor@123",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc8",
    about:
      "Bác sĩ sản phụ khoa giàu kinh nghiệm trong việc chăm sóc sức khỏe phụ nữ mọi giai đoạn. Chuyên về khám phụ khoa định kỳ, siêu âm thai, tư vấn kế hoạch hóa gia đình và điều trị các bệnh lý phụ khoa thường gặp.",
    address: {
      line1: "Số 87, Đường Điện Biên Phủ",
      line2: "Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "ngovanlinh@prescripto.com",
    experience: "3 Năm",
    fees: 240000,
    image: "doc8.png",
    name: "Bác sĩ Ngô Văn Linh",
    password: "Doctor@123",
    speciality: "Bác sĩ sản phụ khoa",
  },
  {
    _id: "doc9",
    about:
      "Bác sĩ da liễu với niềm đam mê về sức khỏe làn da, chuyên điều trị các bệnh lý da mãn tính và cấp tính. Cung cấp dịch vụ tư vấn chăm sóc da, điều trị mụn, nám, tàn nhang và các vấn đề da liễu khác.",
    address: {
      line1: "Số 97, Đường Hoàng Văn Thụ",
      line2: "Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "buithihoa@prescripto.com",
    experience: "1 Năm",
    fees: 120000,
    image: "doc9.png",
    name: "Bác sĩ Bùi Thị Hoa",
    password: "Doctor@123",
    speciality: "Bác sĩ da liễu",
  },
  {
    _id: "doc10",
    about:
      "Bác sĩ nhi khoa tận tâm với sứ mệnh chăm sóc sức khỏe trẻ em. Chuyên theo dõi phát triển thể chất và tinh thần của trẻ, tiêm chủng đầy đủ, khám và điều trị các bệnh lý nhi khoa thường gặp.",
    address: {
      line1: "Số 107, Đường Nam Kỳ Khởi Nghĩa",
      line2: "Phường 7, Quận 3, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "dangvanhung@prescripto.com",
    experience: "2 Năm",
    fees: 170000,
    image: "doc10.png",
    name: "Bác sĩ Đặng Văn Hùng",
    password: "Doctor@123",
    speciality: "Bác sĩ nhi khoa",
  },
  {
    _id: "doc11",
    about:
      "Bác sĩ chuyên khoa thần kinh đầu ngành với chuyên môn về các bệnh lý não và tủy sống. Kinh nghiệm trong điều trị đau đầu mãn tính, động kinh kháng thuốc, bệnh Alzheimer và các rối loạn vận động.",
    address: {
      line1: "Số 117, Đường Pasteur",
      line2: "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "duongthinga@prescripto.com",
    experience: "4 Năm",
    fees: 320000,
    image: "doc11.png",
    name: "Bác sĩ Dương Thị Nga",
    password: "Doctor@123",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc12",
    about:
      "Bác sĩ chuyên khoa tiêu hóa với nhiều năm nghiên cứu và điều trị các bệnh lý đường tiêu hóa. Chuyên về nội soi tiêu hóa, điều trị viêm gan, xơ gan, bệnh lý túi mật và các bệnh lý gan mật tiêu hóa phức tạp.",
    address: {
      line1: "Số 127, Đường 3/2",
      line2: "Phường 12, Quận 10, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "lyvantuan@prescripto.com",
    experience: "4 Năm",
    fees: 290000,
    image: "doc12.png",
    name: "Bác sĩ Lý Văn Tuấn",
    password: "Doctor@123",
    speciality: "Bác sĩ tiêu hóa",
  },
  {
    _id: "doc13",
    about:
      "Bác sĩ đa khoa nhiệt huyết với mong muốn mang đến dịch vụ y tế chất lượng cao cho cộng đồng. Chuyên khám sức khỏe tổng quát, phát hiện sớm các bệnh lý và tư vấn điều trị kịp thời cho bệnh nhân mọi lứa tuổi.",
    address: {
      line1: "Số 137, Đường Nguyễn Thị Minh Khai",
      line2: "Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "trinhthilananh@prescripto.com",
    experience: "4 Năm",
    fees: 210000,
    image: "doc13.png",
    name: "Bác sĩ Trịnh Thị Lan Anh",
    password: "Doctor@123",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc14",
    about:
      "Bác sĩ sản phụ khoa giàu kinh nghiệm trong việc hỗ trợ phụ nữ có thai và sinh nở an toàn. Chuyên theo dõi thai kỳ, siêu âm 4D, tư vấn dinh dưỡng thai sản và chăm sóc sức khỏe sau sinh cho mẹ và bé.",
    address: {
      line1: "Số 147, Đường Lê Lợi",
      line2: "Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "phanvanminh@prescripto.com",
    experience: "3 Năm",
    fees: 260000,
    image: "doc14.png",
    name: "Bác sĩ Phan Văn Minh",
    password: "Doctor@123",
    speciality: "Bác sĩ sản phụ khoa",
  },
  {
    _id: "doc15",
    about:
      "Bác sĩ da liễu trẻ đầy năng lực với kiến thức cập nhật về các phương pháp điều trị da liễu hiện đại. Chuyên điều trị các bệnh da mãn tính, tư vấn chăm sóc da hàng ngày và các liệu pháp thẩm mỹ da an toàn.",
    address: {
      line1: "Số 157, Đường Hoàng Diệu",
      line2: "Phường 10, Quận 4, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    email: "vothithanh@prescripto.com",
    experience: "1 Năm",
    fees: 130000,
    image: "doc15.png",
    name: "Bác sĩ Võ Thị Thanh",
    password: "Doctor@123",
    speciality: "Bác sĩ da liễu",
  },
];

/**
 * Hàm seed dữ liệu bác sĩ vào database
 * Chỉ chạy khi database chưa có bác sĩ nào
 */
const seedDoctors = async () => {
  try {
    // Kiểm tra xem đã có bác sĩ nào trong database chưa
    const existingDoctors = await doctorModel.countDocuments();

    if (existingDoctors > 0) {
      console.log(
        `Database đã có ${existingDoctors} bác sĩ. Bỏ qua việc seed dữ liệu.`,
      );
      return;
    }

    console.log("Bắt đầu seed dữ liệu bác sĩ...");

    // Mã hóa mật khẩu cho tất cả bác sĩ
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("Doctor@123", salt);

    // Chuẩn bị dữ liệu bác sĩ với mật khẩu đã mã hóa và timestamp
    const doctorsToInsert = [];
    for (const doctor of doctorsData) {
      // Upload hình ảnh lên Cloudinary
      const imagePath = path.join(
        __dirname,
        "..",
        "assets_frontend",
        doctor.image,
      );
      let imageUrl = "";
      if (fs.existsSync(imagePath)) {
        const imageUpload = await cloudinary.uploader.upload(imagePath, {
          resource_type: "image",
        });
        imageUrl = imageUpload.secure_url;
      } else {
        console.warn(`Hình ảnh không tồn tại: ${imagePath}`);
        imageUrl = ""; // Hoặc có thể set một URL mặc định
      }

      doctorsToInsert.push({
        about: doctor.about,
        address: doctor.address,
        available: true,
        date: Date.now(),
        degree: doctor.degree,
        email: doctor.email,
        experience: doctor.experience,
        fees: doctor.fees,
        image: imageUrl,
        name: doctor.name,
        password: hashedPassword,
        slots_booked: {},
        speciality: doctor.speciality,
      });
    }

    // Insert tất cả bác sĩ vào database
    await doctorModel.insertMany(doctorsToInsert);

    console.log(`✓ Đã seed thành công ${doctorsToInsert.length} bác sĩ!`);
    console.log("Thông tin đăng nhập mặc định cho tất cả bác sĩ:");
    console.log("Password: Doctor@123");
    console.log("\nDanh sách email bác sĩ:");
    doctorsToInsert.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name}: ${doc.email}`);
    });
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu bác sĩ:", error);
  }
};

export default seedDoctors;
