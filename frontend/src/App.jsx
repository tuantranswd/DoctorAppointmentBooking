import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-10 max-w-7xl">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Doctors />} path="/doctors" />
        <Route element={<Doctors />} path="/doctors/:speciality" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<About />} path="/about" />
        <Route element={<Login />} path="/login" />
        <Route
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
          path="/my-profile"
        />
        <Route
          element={
            <ProtectedRoute>
              <MyAppointments />
            </ProtectedRoute>
          }
          path="/my-appointments"
        />
        <Route element={<Appointment />} path="/appointment/:docId" />
      </Routes>
      <Footer />
      <ToastContainer autoClose={500} position="top-right" theme="light" />
    </div>
  );
}

export default App;
