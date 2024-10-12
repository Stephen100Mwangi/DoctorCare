import { BrowserRouter, Routes, Route } from "react-router-dom"
import DoctorDashBoard from "./pages/DoctorDashBoard"
import DoctorAppointments from "./pages/DoctorAppointments"
import Doctor_Register from "./pages/RegisterDoctor"
import Doctor_Login from "./pages/LoginDoctor"
import DoctorNavbar from "./components/DoctorNavbar"
import DoctorSchedule from "./pages/DoctorSchedule"
import DoctorHomepage from './pages/DoctorHomepage'

const App = () => {
  return (
    <BrowserRouter>
    <DoctorNavbar></DoctorNavbar>
      <Routes>
        <Route path="/" element={<DoctorHomepage></DoctorHomepage>}></Route>
        <Route path="/doctor/dashboard" element={<DoctorDashBoard></DoctorDashBoard>}></Route>
        <Route path="/doctor/appointments" element={<DoctorAppointments></DoctorAppointments>}></Route>
        <Route path="/register/doctor" element={<Doctor_Register></Doctor_Register>}></Route>
        <Route path="/login/doctor" element={<Doctor_Login></Doctor_Login>}></Route>
        <Route path="/doctor/schedule" element={<DoctorSchedule></DoctorSchedule>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
