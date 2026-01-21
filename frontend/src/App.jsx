import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Doctors />} path="/doctors/:speciality" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<About />} path="/about" />
        <Route element={<Login />} path="/login" />
        <Route element={<MyProfile />} path="/my-profile" />
        <Route element={<MyAppointments />} path="/my-appointments" />
        <Route element={<Appointment />} path="/appointment/:docId" />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
