# Tài liệu Thư mục `src`

Thư mục `src` chứa toàn bộ mã nguồn của ứng dụng frontend cho hệ thống đặt lịch hẹn bác sĩ, được xây dựng bằng React và Vite.

## Cấu trúc Thư mục

```
src/
├── App.css              # Styles cho component App
├── App.jsx              # Component chính định tuyến ứng dụng
├── assets/              # Tài nguyên tĩnh (hình ảnh, icon, dữ liệu)
├── components/          # Các component tái sử dụng
├── context/             # Context API cho quản lý trạng thái toàn cục
├── index.css            # Styles toàn cục và cấu hình Tailwind CSS
├── main.jsx             # Điểm vào của ứng dụng React
└── pages/               # Các trang chính của ứng dụng
```

## Chi tiết Các File và Thư mục

### File Chính

#### [`App.jsx`](src/App.jsx)
Component chính của ứng dụng, định nghĩa các route sử dụng React Router.

- **Chức năng chính:**
  - Định tuyến giữa các trang
  - Bao bọc toàn bộ ứng dụng với layout chung (Navbar và Footer)
  - Sử dụng container responsive với max-width và padding

- **Routes được định nghĩa:**
  - `/` - Trang chủ ([`Home`](src/pages/Home.jsx))
  - `/doctors` - Danh sách bác sĩ ([`Doctors`](src/pages/Doctors.jsx))
  - `/doctors/:speciality` - Bác sĩ theo chuyên khoa
  - `/contact` - Liên hệ ([`Contact`](src/pages/Contact.jsx))
  - `/about` - Giới thiệu ([`About`](src/pages/About.jsx))
  - `/login` - Đăng nhập ([`Login`](src/pages/Login.jsx))
  - `/my-profile` - Hồ sơ cá nhân ([`MyProfile`](src/pages/MyProfile.jsx))
  - `/my-appointments` - Lịch hẹn của tôi ([`MyAppointments`](src/pages/MyAppointments.jsx))
  - `/appointment/:docId` - Đặt lịch hẹn ([`Appointment`](src/pages/Appointment.jsx))

#### [`main.jsx`](src/main.jsx)
Điểm vào của ứng dụng React.

- **Chức năng:**
  - Render ứng dụng vào DOM element có id "root"
  - Bao bọc với `StrictMode` để phát hiện lỗi trong development
  - Cung cấp `BrowserRouter` cho routing
  - Bao bọc với [`AppContextProvider`](src/context/AppContext.jsx) để cung cấp context toàn cục

#### [`index.css`](src/index.css)
File CSS toàn cục.

- **Import:**
  - Font Inter từ Google Fonts
  - Tailwind CSS

- **Cấu hình theme:**
  - Biến CSS `--color-primary: #5f6fff`

- **Utility classes:**
  - `.active hr` - Hiển thị đường kẻ ngang khi active
  - `.hide-scrollbar` - Ẩn scrollbar nhưng giữ chức năng scroll
  - `.grid-cols-auto` - Grid tự động với min-width 200px

#### [`App.css`](src/App.css)
Styles cho component App, import Tailwind CSS.

### Thư mục `assets/`

Chứa tài nguyên tĩnh được chia thành hai thư mục con:

- `assets_frontend/` - Tài nguyên cho phần frontend (hình ảnh bác sĩ, icon, logo)
- `assets_admin/` - Tài nguyên cho phần admin (icon quản lý, logo admin)

File [`assets.js`](src/assets/assets_frontend/assets.js) export các tài nguyên này.

### Thư mục `components/`

Chứa các component tái sử dụng:

- [`Banner.jsx`](src/components/Banner.jsx) - Banner quảng cáo
- [`Footer.jsx`](src/components/Footer.jsx) - Footer của trang
- [`Header.jsx`](src/components/Header.jsx) - Header trang chủ
- [`Navbar.jsx`](src/components/Navbar.jsx) - Thanh điều hướng
- [`RelatedDoctors.jsx`](src/components/RelatedDoctors.jsx) - Bác sĩ liên quan
- [`SpecialityMenu.jsx`](src/components/SpecialityMenu.jsx) - Menu chuyên khoa
- [`TopDoctors.jsx`](src/components/TopDoctors.jsx) - Bác sĩ nổi bật

#### Ví dụ: [`Navbar.jsx`](src/components/Navbar.jsx)
Component thanh điều hướng responsive.

- **State:**
  - `token` - Trạng thái đăng nhập (tạm thời set true)
  - `showMenu` - Hiển thị menu mobile

- **Chức năng:**
  - Điều hướng giữa các trang
  - Menu responsive cho mobile
  - Hiển thị nút đăng nhập/đăng xuất

### Thư mục `context/`

#### [`AppContext.jsx`](src/context/AppContext.jsx)
Context API cho quản lý trạng thái toàn cục.

- **Hook tùy chỉnh:** [`useAppContext()`](src/context/AppContext.jsx:16)
- **Dữ liệu cung cấp:**
  - `doctors` - Danh sách bác sĩ
  - `specialityData` - Danh sách chuyên khoa
  - `formatCurrency()` - Hàm format tiền VND

- **Ví dụ sử dụng:**
  ```jsx
  import { useAppContext } from './context/AppContext';

  const MyComponent = () => {
    const { doctors, formatCurrency } = useAppContext();
    // Sử dụng dữ liệu...
  };
  ```

### Thư mục `pages/`

Chứa các component trang chính:

- [`Home.jsx`](src/pages/Home.jsx) - Trang chủ, kết hợp Header, SpecialityMenu, TopDoctors, Banner
- [`Doctors.jsx`](src/pages/Doctors.jsx) - Danh sách bác sĩ
- [`Appointment.jsx`](src/pages/Appointment.jsx) - Trang đặt lịch hẹn
- [`Contact.jsx`](src/pages/Contact.jsx) - Trang liên hệ
- [`About.jsx`](src/pages/About.jsx) - Trang giới thiệu
- [`Login.jsx`](src/pages/Login.jsx) - Trang đăng nhập
- [`MyAppointments.jsx`](src/pages/MyAppointments.jsx) - Lịch hẹn cá nhân
- [`MyProfile.jsx`](src/pages/MyProfile.jsx) - Hồ sơ người dùng

## Kiến trúc Ứng dụng

Ứng dụng sử dụng:

- **React Router** cho client-side routing
- **Tailwind CSS** cho styling
- **Context API** cho state management toàn cục
- **Vite** làm build tool

## Quy ước Phát triển

- Sử dụng functional components với hooks
- State được quản lý cục bộ hoặc qua Context
- Styles sử dụng Tailwind CSS classes
- Font chữ Inter cho toàn bộ ứng dụng
- Responsive design với breakpoints của Tailwind

## Lưu ý

- Ứng dụng được thiết kế cho tiếng Việt
- Tiền tệ được format theo chuẩn VND
- Responsive trên các thiết bị desktop và mobile