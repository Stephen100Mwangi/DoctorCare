/* eslint-disable no-unused-vars */
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/PATIENT/PatientProfile'
import Page404 from './pages/Page_404'
import DoctorsPage from './pages/DoctorsPage'
import About from './pages/About'
import Contacts from './pages/Contacts'
import BookingDoctors from './pages/BookingDoctors'

import Patient_Register from './pages/PATIENT/RegisterPatient'
import Patient_Login from './pages/PATIENT/LoginPatient'


import { logoutUser } from './features/visitor/visitorSlice'
import { logoutAdmin } from './features/admin/AdminSlice'
import { logoutDoctor } from './features/doctor/DoctorSlice'
import { persistor } from './app/store'
import ManageBookings from './pages/PATIENT/ManageBookings'
const App = () => {

  // const dispatch = useDispatch();

  // useEffect(()=>{
  //   const handleTabClose = ()=>{
  //     dispatch(logoutUser())
  //     dispatch(logoutAdmin())
  //     dispatch(logoutDoctor())

  //     localStorage.removeItem("patientData")
  //     localStorage.removeItem("doctorData")
  //     localStorage.removeItem("adminData")

  //     persistor.purge();
  //   }

  //   window.addEventListener("beforeunload",handleTabClose)
  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // },[dispatch])
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
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
