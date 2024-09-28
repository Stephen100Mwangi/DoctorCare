import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Patient_Register from './pages/VISITOR/RegisterPatient'
import Patient_Login from './pages/VISITOR/LoginPatient'
import Profile from './pages/VISITOR/PatientProfile'
import Page404 from './pages/Page_404'
import DoctorsPage from './pages/DoctorsPage'
import About from './pages/About'
import Contacts from './pages/Contacts'
import BookingDoctors from './pages/BookingDoctors'
import Doctor_Register from './pages/DOCTOR/DoctorRegister'
import Doctor_Login from './pages/DOCTOR/DoctorLogin'
import DoctorProfile from './pages/DOCTOR/DoctorProfile'

import { logoutUser } from './features/visitor/visitorSlice'
import { logoutAdmin } from './features/admin/AdminSlice'
import { logoutDoctor } from './features/doctor/DoctorSlice'
import { persistor } from './app/store'
import ManageBookings from './pages/VISITOR/ManageBookings'
import ReadDoctors from './pages/ADMIN/ReadDoctors'
import ReadBookings from './pages/ADMIN/ReadBookings'
const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    const handleTabClose = ()=>{
      dispatch(logoutUser())
      dispatch(logoutAdmin())
      dispatch(logoutDoctor())

      localStorage.removeItem("patientData")
      localStorage.removeItem("doctorData")
      localStorage.removeItem("adminData")

      persistor.purge();
    }

    window.addEventListener("beforeunload",handleTabClose)
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  },[dispatch])
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contacts' element={<Contacts></Contacts>}></Route>
        <Route path='*' element={<Page404></Page404>}></Route>

        <Route path='/register/visitor' element={<Patient_Register></Patient_Register>}></Route>
        <Route path='/login/visitor' element={<Patient_Login></Patient_Login>}></Route>
        <Route path='/visitor/profile' element={<Profile></Profile>}></Route>
        <Route path='/patient/managePersonalBookings' element={<ManageBookings></ManageBookings>}></Route>

        <Route path='/booking/doctor' element={<BookingDoctors></BookingDoctors>}></Route>
        <Route path='/doctors/allDoctors' element={<DoctorsPage></DoctorsPage>}></Route>
        <Route path='/doctor/register' element={<Doctor_Register></Doctor_Register>}></Route>
        <Route path='/doctor/login' element={<Doctor_Login></Doctor_Login>}></Route>
        <Route path='/doctor/personalPage' element={<DoctorProfile></DoctorProfile>}></Route>

        <Route path='/admin/read/doctors' element={<ReadDoctors></ReadDoctors>}></Route>
        <Route path='/admin/read/appointments' element={<ReadBookings></ReadBookings>}></Route>
       
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
