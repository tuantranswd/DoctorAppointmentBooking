import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AddDoctor from "./pages/AddDoctor.jsx";
import AllAppointments from "./pages/AllAppointments.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DoctorList from "./pages/DoctorList.jsx";
import Login from "./pages/Login.jsx";

/**
 * Component App chính
 * Cấu hình routing cho ứng dụng Admin
 * Bao gồm:
 * - Route đăng nhập (public)
 * - Route dashboard (protected)
 * - Route mặc định chuyển hướng
 */
function App() {
  return (
    <>
      {/* Container hiển thị thông báo toast */}
      <ToastContainer
        autoClose={500}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position="top-right"
        rtl={false}
        theme="light"
      />

      {/* Cấu hình các routes */}
      <Routes>
        {/* Route đăng nhập - công khai */}
        <Route element={<Login />} path="/login" />

        {/* Routes được bảo vệ */}
        <Route
          element={
            <ProtectedRoute>
              <div className="bg-[#F8F9FD]">
                {/* Navbar luôn ở trên cùng */}
                <Navbar />

                <div className="flex items-start">
                  {/* Sidebar cố định bên trái */}
                  <Sidebar />

                  {/* Nội dung chính bên phải */}
                  <Outlet />
                </div>
              </div>
            </ProtectedRoute>
          }
          path="/"
        >
          {/* Route dashboard */}
          <Route element={<Dashboard />} path="dashboard" />

          {/* Route thêm bác sĩ */}
          <Route element={<AddDoctor />} path="add-doctor" />

          {/* Route danh sách bác sĩ */}
          <Route element={<DoctorList />} path="doctors" />

          {/* Route tất cả lịch hẹn */}
          <Route element={<AllAppointments />} path="appointments" />

          {/* Route mặc định - chuyển hướng đến dashboard */}
          <Route element={<Navigate replace to="dashboard" />} index />
        </Route>

        {/* Route không tồn tại - chuyển hướng đến dashboard */}
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
      </Routes>
    </>
  );
}

export default App;
