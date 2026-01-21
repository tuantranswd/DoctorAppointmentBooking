# Hướng dẫn Test API Quản trị viên (Admin API)

## 🚀 Cài đặt và Khởi động

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình file .env
Tạo file `.env` dựa trên `.env.example` và điền thông tin:
```env
PORT=4000
MONGODB_URI='mongodb+srv://<username>:<password>@cluster.mongodb.net/database_name'
CLOUDINARY_CLOUD_NAME='your_cloud_name'
CLOUDINARY_API_KEY='your_api_key'
CLOUDINARY_API_SECRET='your_api_secret'
JWT_SECRET='your_jwt_secret_key'
```

### 3. Khởi động server
```bash
npm start
```

Server sẽ tự động tạo tài khoản Admin mặc định:
- **Email**: admin@prescripto.com
- **Password**: Admin@123

---

## 📋 API Endpoints

### 1. Đăng nhập Admin (Login Admin)

**Endpoint**: `POST http://localhost:4000/api/admin/login`

**Headers**: 
```
Content-Type: application/json
```

**Body (JSON)**:
```json
{
  "email": "admin@prescripto.com",
  "password": "Admin@123"
}
```

**Response thành công**:
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response thất bại**:
```json
{
  "success": false,
  "message": "Email hoặc mật khẩu không đúng"
}
```

---

### 2. Thêm Bác sĩ (Add Doctor)

**Endpoint**: `POST http://localhost:4000/api/admin/add-doctor`

**Headers**: 
```
token: <JWT_TOKEN_FROM_LOGIN>
```

**Body (form-data)**:
```
name: Dr. Nguyen Van A
email: doctor1@example.com
password: Doctor@123
speciality: Nội khoa
degree: MBBS, MD
experience: 10 năm
about: Bác sĩ chuyên khoa nội với 10 năm kinh nghiệm
fees: 500000
address: {"line1":"123 Đường ABC","line2":"Quận 1, TP.HCM"}
image: <SELECT IMAGE FILE>
```

**Response thành công**:
```json
{
  "success": true,
  "message": "Thêm bác sĩ thành công",
  "doctor": {
    "id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "name": "Dr. Nguyen Van A",
    "email": "doctor1@example.com"
  }
}
```

**Response thất bại**:
```json
{
  "success": false,
  "message": "Email đã được sử dụng"
}
```

---

## 🧪 Test với Postman

### Test 1: Đăng nhập Admin

1. Tạo request mới: `POST http://localhost:4000/api/admin/login`
2. Chọn tab **Body** → **raw** → **JSON**
3. Nhập:
```json
{
  "email": "admin@prescripto.com",
  "password": "Admin@123"
}
```
4. Nhấn **Send**
5. Copy `token` từ response

### Test 2: Thêm Bác sĩ

1. Tạo request mới: `POST http://localhost:4000/api/admin/add-doctor`
2. Chọn tab **Headers**, thêm:
   - Key: `token`
   - Value: `<PASTE_TOKEN_FROM_LOGIN>`
3. Chọn tab **Body** → **form-data**
4. Thêm các field:
   - `name`: Dr. Nguyen Van A
   - `email`: doctor1@example.com
   - `password`: Doctor@123
   - `speciality`: Nội khoa
   - `degree`: MBBS, MD
   - `experience`: 10 năm
   - `about`: Bác sĩ chuyên khoa nội với 10 năm kinh nghiệm
   - `fees`: 500000
   - `address`: {"line1":"123 Đường ABC","line2":"Quận 1, TP.HCM"}
   - `image`: (Chọn file ảnh từ máy tính)
5. Nhấn **Send**

---

## 🧪 Test với cURL

### Test 1: Đăng nhập Admin
```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@prescripto.com\",\"password\":\"Admin@123\"}"
```

### Test 2: Thêm Bác sĩ
```bash
curl -X POST http://localhost:4000/api/admin/add-doctor \
  -H "token: YOUR_JWT_TOKEN_HERE" \
  -F "name=Dr. Nguyen Van A" \
  -F "email=doctor1@example.com" \
  -F "password=Doctor@123" \
  -F "speciality=Nội khoa" \
  -F "degree=MBBS, MD" \
  -F "experience=10 năm" \
  -F "about=Bác sĩ chuyên khoa nội với 10 năm kinh nghiệm" \
  -F "fees=500000" \
  -F "address={\"line1\":\"123 Đường ABC\",\"line2\":\"Quận 1, TP.HCM\"}" \
  -F "image=@/path/to/doctor-image.jpg"
```

---

## 🔒 Bảo mật (Security)

### Middleware authAdmin
- Kiểm tra token trong header của mỗi request
- Nếu không có token hoặc token sai → Từ chối request
- Token có hiệu lực trong 7 ngày

### Mã hóa mật khẩu
- Sử dụng bcrypt với salt rounds = 10
- Mật khẩu phải có ít nhất 8 ký tự

### Validation
- Email phải hợp lệ (sử dụng validator.isEmail)
- Kiểm tra trùng lặp email
- Kiểm tra đầy đủ các field bắt buộc

---

## 📁 Cấu trúc File

```
backend/
├── controllers/
│   └── adminController.js       # Login & AddDoctor logic
├── middleware/
│   └── authAdmin.js             # JWT authentication middleware
├── models/
│   ├── adminModel.js            # Admin schema
│   ├── doctorModel.js           # Doctor schema
│   └── userModel.js             # User schema
├── routes/
│   └── adminRoute.js            # Admin API routes
├── scripts/
│   └── createAdmin.js           # Create default admin
└── server.js                     # Main server file
```

---

## ⚠️ Lưu ý

1. **JWT_SECRET**: Phải được cấu hình trong file `.env`
2. **Cloudinary**: Cần cấu hình đúng để upload ảnh
3. **MongoDB**: Đảm bảo kết nối thành công trước khi test
4. **Token**: Phải được gửi trong header với key là `token` (không phải `Authorization`)
5. **Address**: Phải là chuỗi JSON hợp lệ: `{"line1":"...","line2":"..."}`

---

## 🐛 Troubleshooting

### Lỗi: "Token không hợp lệ hoặc đã hết hạn"
- Kiểm tra token có được gửi đúng trong header không
- Token có thể đã hết hạn (7 ngày), đăng nhập lại để lấy token mới

### Lỗi: "Email đã được sử dụng"
- Email bác sĩ đã tồn tại trong database
- Sử dụng email khác hoặc xóa bác sĩ cũ

### Lỗi: "Cloudinary upload failed"
- Kiểm tra cấu hình Cloudinary trong `.env`
- Kiểm tra kết nối internet
- Đảm bảo file ảnh hợp lệ

---

## ✅ Checklist Test

- [ ] Server khởi động thành công
- [ ] Admin mặc định được tạo
- [ ] Đăng nhập thành công với admin mặc định
- [ ] Nhận được JWT token
- [ ] Thêm bác sĩ thành công với token hợp lệ
- [ ] Ảnh được upload lên Cloudinary
- [ ] Mật khẩu bác sĩ được mã hóa
- [ ] Từ chối request khi không có token
- [ ] Từ chối request khi token không hợp lệ
