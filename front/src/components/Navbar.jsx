import Button from './Button';
import Logo from './Logo';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {CgProfile} from 'react-icons/cg';
import {FaPersonWalkingArrowRight} from 'react-icons/fa6';
import { MdClose, MdMenu, MdHomeFilled } from 'react-icons/md';
import { useState } from 'react';
// import { FaUserDoctor } from "react-icons/fa6";

const Navbar = () => {
  const patientUser = useSelector (state => state.patientData.value);
  const patientLoggedIn = patientUser.isLoggedIn;
  const [mobileMenu,setShowMobileMenu] = useState(false)

  return (
    <div className="flex justify-between items-center p-8 py-5 border-b max-sm:p-4">
      <Logo />

      
      <div className="links uppercase flex space-x-8 text-base font-semibold text-black max-sm:hidden">
        <Link
          to={'/'}
          className="hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8"
        >
          Home
        </Link>
        <Link
          to={'/doctors/allDoctors'}
          className="hover:underline focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8"
        >
          All Doctors
        </Link>
        <Link
          to={'/about'}
          className="hover:underline  focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8"
        >
          About
        </Link>
        <Link
          to={'/contacts'}
          className="hover:underline  focus:text-card focus:underline-offset-8 transition-colors hover:text-card hover:underline-offset-8"
        >
          Contacts
        </Link>
      </div>

      <div className="flex items-center justify-center space-x-5 max-sm:hidden">
        {!patientLoggedIn &&
          <div className="login">
            <Button link_path="/login/visitor" text="Create account" />
          </div>}
        {patientLoggedIn &&
          <div className="flex justify-center items-center gap-x-2 bg-black bg-opacity-5 text-red-500 p-3 cursor-pointer">
            <p>Log Out</p>
            <FaPersonWalkingArrowRight />
          </div>}
        {patientLoggedIn &&
          <Link to={'/patient/profile'}>
            {' '}<CgProfile className="size-[32px] cursor-pointer" />
          </Link>}
      </div>



      <div className='flex flex-col gap-y-3 justify-end items-end sm:hidden'>
        {/* Mobile View */}
        {
          !mobileMenu && ( <MdMenu className='justify-end text-right text-card' onClick={()=>setShowMobileMenu(prev => !prev)}></MdMenu>)
        }
        {
          mobileMenu && ( <MdClose className='justify-end text-right text-red-700'  onClick={()=>setShowMobileMenu(prev => !prev)}></MdClose>)
        }

        {
          mobileMenu && ( <div className="flex flex-col justify-end sm:hidden">
        

          <div className="flex flex-col gap-y-3 items-end justify-end">
              <Link to={"/"}>Home</Link>
              <Link to={"/"}>All Doctors</Link>
              <Link to={"/"}>Contacts</Link>
              <Link to={"/"}>Contacts</Link>
           

            <div className="flex items-center justify-center space-x-5">
          {!patientLoggedIn &&
            <div className="login">
              <Link to="/login/visitor" text="Create account" className='bg-card text-white p-2'>Create Account</Link>
            </div>}
          {patientLoggedIn &&
            <div className="flex justify-center items-center gap-x-2 bg-black bg-opacity-5 text-red-500 p-3 cursor-pointer">
              <p>Log Out</p>
              <FaPersonWalkingArrowRight />
            </div>}
          {patientLoggedIn &&
            <Link to={'/patient/profile'}>
              {' '}<CgProfile className="size-[32px] cursor-pointer" />
            </Link>}
          </div>
            
          </div>
        </div>)
        }
      </div>
     

     

      

    </div>
  );
};

export default Navbar;
