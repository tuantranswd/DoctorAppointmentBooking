import about_image from "./about_image.png";
import appointment_img from "./appointment_img.png";
import arrow_icon from "./arrow_icon.svg";
import chats_icon from "./chats_icon.svg";
import contact_image from "./contact_image.png";
import cross_icon from "./cross_icon.png";
import Dermatologist from "./Dermatologist.svg";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import dropdown_icon from "./dropdown_icon.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import group_profiles from "./group_profiles.png";
import header_img from "./header_img.png";
import info_icon from "./info_icon.svg";
import logo from "./logo.svg";
import menu_icon from "./menu_icon.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";
import profile_pic from "./profile_pic.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import upload_icon from "./upload_icon.png";
import verified_icon from "./verified_icon.svg";

export const assets = {
  about_image,
  appointment_img,
  arrow_icon,
  chats_icon,
  contact_image,
  cross_icon,
  dropdown_icon,
  group_profiles,
  header_img,
  info_icon,
  logo,
  menu_icon,
  profile_pic,
  razorpay_logo,
  stripe_logo,
  upload_icon,
  verified_icon,
};

export const specialityData = [
  {
    image: General_physician,
    speciality: "Bác sĩ đa khoa",
  },
  {
    image: Gynecologist,
    speciality: "Bác sĩ sản phụ khoa",
  },
  {
    image: Dermatologist,
    speciality: "Bác sĩ da liễu",
  },
  {
    image: Pediatricians,
    speciality: "Bác sĩ nhi khoa",
  },
  {
    image: Neurologist,
    speciality: "Bác sĩ thần kinh",
  },
  {
    image: Gastroenterologist,
    speciality: "Bác sĩ tiêu hóa",
  },
];

export const doctors = [
  {
    _id: "doc1",
    about:
      "Bác sĩ chuyên về y học đa khoa với nhiều năm kinh nghiệm trong việc chẩn đoán và điều trị các bệnh lý thông thường. Tập trung vào y học dự phòng, tầm soát sức khỏe định kỳ và tư vấn lối sống lành mạnh giúp bệnh nhân phòng ngừa bệnh tật hiệu quả.",
    address: {
      line1: "Số 17, Đường Nguyễn Văn Linh",
      line2: "Phường Tân Thuận Tây, Quận 7, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    experience: "4 Năm",
    fees: 200000,
    image: doc1,
    name: "Bác sĩ Nguyễn Văn An",
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
    experience: "3 Năm",
    fees: 250000,
    image: doc2,
    name: "Bác sĩ Trần Thị Lan",
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
    experience: "1 Năm",
    fees: 150000,
    image: doc3,
    name: "Bác sĩ Lê Thị Mai",
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
    experience: "2 Năm",
    fees: 180000,
    image: doc4,
    name: "Bác sĩ Phạm Văn Bình",
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
    experience: "4 Năm",
    fees: 300000,
    image: doc5,
    name: "Bác sĩ Hoàng Thị Hương",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc6",
    about:
      "Bác sĩ chuyên khoa thần kinh với chuyên môn sâu về chẩn đoán và điều trị các rối loạn thần kinh. Đặc biệt quan tâm đến các bệnh lý như đau dây thần kinh, bệnh lý cột sống cổ, yếu cơ và các vấn đề về trí nhớ.",
    address: {
      line1: "Số 67, Đường Điện Biên Phủ",
      line2: "Phường 17, Quận Bình Thạnh, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    experience: "4 Năm",
    fees: 280000,
    image: doc6,
    name: "Bác sĩ Đỗ Văn Cường",
    speciality: "Bác sĩ thần kinh",
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
    experience: "4 Năm",
    fees: 220000,
    image: doc7,
    name: "Bác sĩ Vũ Văn Đức",
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
    experience: "3 Năm",
    fees: 240000,
    image: doc8,
    name: "Bác sĩ Ngô Thị Linh",
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
    experience: "1 Năm",
    fees: 120000,
    image: doc9,
    name: "Bác sĩ Bùi Thị Hoa",
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
    experience: "2 Năm",
    fees: 170000,
    image: doc10,
    name: "Bác sĩ Đặng Văn Hùng",
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
    experience: "4 Năm",
    fees: 320000,
    image: doc11,
    name: "Bác sĩ Dương Thị Nga",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc12",
    about:
      "Bác sĩ chuyên khoa thần kinh với nhiều năm nghiên cứu và điều trị các bệnh lý thần kinh. Chuyên về đột quỵ não, bệnh Parkinson, đau dây thần kinh tọa và các bệnh lý cơ xương khớp liên quan đến thần kinh.",
    address: {
      line1: "Số 127, Đường 3/2",
      line2: "Phường 12, Quận 10, TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ Y khoa",
    experience: "4 Năm",
    fees: 290000,
    image: doc12,
    name: "Bác sĩ Lý Văn Tuấn",
    speciality: "Bác sĩ thần kinh",
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
    experience: "4 Năm",
    fees: 210000,
    image: doc13,
    name: "Bác sĩ Trịnh Thị Lan Anh",
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
    experience: "3 Năm",
    fees: 260000,
    image: doc14,
    name: "Bác sĩ Phan Thị Minh",
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
    experience: "1 Năm",
    fees: 130000,
    image: doc15,
    name: "Bác sĩ Võ Thị Thanh",
    speciality: "Bác sĩ da liễu",
  },
];
