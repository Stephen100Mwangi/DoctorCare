import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import Logo from "./Logo"
import Button from './Button';
import { useSelector } from 'react-redux'

const AdminNavbar = () => {
  const admin = useSelector(state => state.adminData.value);
  const doctorLoggedIn = admin.isLoggedIn;
  
  return (
    <div className="flex justify-between items-center p-6  border-b border-blue-200">
      <Logo />
      <div className="links uppercase flex space-x-8 text-base font-semibold text-black">
        <Link to="/doctor/dashboard" className="flex items-center justify-center hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">
          Dashboard
        </Link>
        <Link to="/doctor/appointments" className="flex items-center justify-center hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">
          Appointments
        </Link>
        <Link to="/doctor/patients" className="flex items-center justify-center hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">
          Patients
        </Link>
        <Link to="/doctor/schedule" className="flex items-center justify-center hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">
          Schedule
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        
        {
          doctorLoggedIn && 
          (
            <Link to="/doctor/profile" className="text-blue-800 hover:text-blue-600 transition-colors">
              <CgProfile className="size-[32px]" />
            </Link>
          )
        }
        {
          !doctorLoggedIn && 
          ( 
            <Button link_path={'/login/doctor'} text={"Create account"}></Button>
          )
        }
       
      </div>
    </div>
  )
}

export default AdminNavbar