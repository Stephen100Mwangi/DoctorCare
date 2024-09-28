import Button from "./Button"
import Logo from "./Logo"
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux"
import { CgProfile } from "react-icons/cg";
// import { FaUserDoctor } from "react-icons/fa6";

const Navbar = () => {
  const patientUser = useSelector((state)=>state.patientData.value);
  const patientLoggedIn = patientUser.isLoggedIn;

  return (
    <div className="flex justify-between items-center p-8 py-5 border-b">
      <Logo></Logo>
      <div className="links uppercase flex space-x-8 text-base font-semibold text-black">
        <Link to={"/"} className="hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">Home</Link>
        <Link to={"/doctors/allDoctors"} className="hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">All Doctors</Link>
        <Link to={"/about"} className="hover:underline  focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">About</Link>
        <Link to={"/contacts"} className="hover:underline  focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8">Contacts</Link>
      </div>
      {
        !patientLoggedIn && <div className="login"><Button link_path="/login/visitor" text="Create account"></Button></div>
      }
      {
        patientLoggedIn && <Link to={"/visitor/profile"}> <CgProfile className="size-[32px] cursor-pointer"></CgProfile></Link>
      }
    </div>
  )
}

export default Navbar
