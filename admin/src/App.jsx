import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
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

        {/* Route dashboard - được bảo vệ bởi ProtectedRoute */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          path="/dashboard"
        />

        {/* Route mặc định - chuyển hướng đến dashboard */}
        <Route element={<Navigate replace to="/dashboard" />} path="/" />

        {/* Route không tồn tại - chuyển hướng đến dashboard */}
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
      </Routes>
    </>
  );
}

export default App;
