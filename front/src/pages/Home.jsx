import { useEffect, useState } from "react"
import Button from "../components/Button"
import DoctorCard from "../components/DoctorCard"
import DoctorIcon from "../components/DoctorIcon"
import Logo from "../components/Logo"
import toast from "react-hot-toast"

const Home = () => {

  const localUrl = import.meta.env.VITE_LOCAL_URL;
  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = localUrl || apiURL;

  const [availableDoctors,setDoctors] = useState([]);

  useEffect(()=>{
    async function fetchDoctors() {
      try {
        const response = await fetch(`${baseUrl}/api/doctors/fetchAllDoctors`);
        if (!response.ok) {
          toast.error("Error fetching doctors")
          return;
        }

        const doctorsFound = await response.json();
        console.log(doctorsFound);
        setDoctors(doctorsFound.doctors.slice(0,5))
        
        
      } catch (error) {
        toast.error("Internal server error");
        console.log(error.message);
        return;        
      }
      
    }
    fetchDoctors();
  },[baseUrl])
  return (
    <div id="home" className="w-full min-h-[calc(100vh-80px)] flex flex-col px-12 py-20 max-sm:py-24 max-sm:px-4">
      <div className="w-full h-fit relative bg-card rounded-lg p-8">
        <div className="relative flex flex-col gap-12 max-sm:gap-y-10">
          <div className="text-5xl max-w-[420px] text-left text-white leading-tight font-medium max-sm:w-full">Book Appointment with Trusted Doctors</div>
          <div className="flex justify-center space-x-2 items-center max-w-[500px] max-sm:w-full">
            <div className="images">
              <img src="./assets/assets_frontend/group_profiles.png" alt="" />
            </div>
            <div className="text-white text-sm">
              Simply Browse through our extensive list of trusted doctors,schedule your appointment hassle free.
            </div>
          </div>
          <Button text={"Book Appointment"}></Button>
        </div>
        <img src="./doc-header-img.png" alt="" className="absolute z-50 right-5 top-8 h-[360px] max-sm:hidden" />
      </div>

      <div className="flex justify-center gap-y-10 flex-col items-center my-16 mb-48">
      <div className="text-2xl font-bold text-center">Find by Specialty</div>
      <div className="text-center text-xl font-medium">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</div>
      <div className="flex justify-center items-center gap-x-8 max-sm:flex-col max-sm:gap-y-5">
        <DoctorIcon role={"General Physician"} icon={"./assets_frontend/General_physician.svg"}></DoctorIcon>
        <DoctorIcon role={"Gynecologist"} icon={"./assets_frontend/Gynecologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Dermatologist"} icon={"./assets_frontend/Dermatologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Pediatricians"} icon={"./assets_frontend/Pediatricians.svg"}></DoctorIcon>
        <DoctorIcon role={"Neurologist"} icon={"./assets_frontend/Neurologist.svg"}></DoctorIcon>
        <DoctorIcon role={"Gastroenterologist"} icon={"./assets_frontend/Gastroenterologist.svg"}></DoctorIcon>
      </div>
    </div>

     <div id="doctor" className="flex justify-center items-center gap-y-10 mx-12 flex-col my-8 mb-24">
        <div className="title text-2xl font-bold text-center">Top Doctors To Book</div>
        <div className="text-sm font-light text-center">Simply browse through extensive list of trusted Doctors</div>
        <div className="images grid grid-cols-5 gap-16 justify-center items-center">
          {
            availableDoctors.map((eachDoctor)=> <DoctorCard key={eachDoctor._id} name={eachDoctor.username} role={eachDoctor.position} image={eachDoctor.doctorImage} available={eachDoctor.available}></DoctorCard>)
          }
        </div>
    </div>

    <div id="custom" className="my-8 mx-10 flex p-24 h-fit relative bg-card rounded-lg max-sm:mx-2 max-sm:p-8 overflow-x-clip">
        <div className="flex flex-col gap-10">
            <div className="text-white text-3xl max-w-[350px]">Book Appointments <br /> with 100+ Trusted Doctors</div>
            <Button text="Create account"></Button>
        </div>
        <div>
            <img className="h-[420px] absolute -top-16 right-5 max-sm:scale-75 max-sm:-top-28 max-sm:-right-28" src="./appointment-doc-img.png" alt="" />
        </div>
    </div>

    <div className="flex flex-col gap-y-5 p-8 pb-2 justify-center items-center pt-24">
        <div className='flex justify-evenly gap-x-24 border-b-2 pb-8 max-sm:flex-col max-sm:gap-x-0 max-sm:gap-y-20 '>
            <div className="w-1/2 flex flex-col gap-5 justify-start items-start max-sm:w-full">
            <Logo></Logo>
            <p>
              At DoctorCare, our mission is to provide exceptional healthcare services
              with a focus on patient well-being and comfort. With a team of experienced
              professionals and state-of-the-art facilities, we offer personalized care
              to meet the unique needs of every patient. Whether you&apos;re visiting for a
              routine check-up or specialized treatment, we are committed to ensuring
              your health is in the best hands.
            </p>
            </div>
            <div className="w-1/2 flex justify-start pl-8 gap-x-28 items-start max-sm:w-full max-sm:gap-x-0 max-sm:justify-between max-sm:pl-0">
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>COMPANY</div>
                <div>Home</div>
                <div>Privacy policy</div>
                <div>Contact us</div>
                <div>Privacy policy</div>
             </div>
             <div className='flex flex-col space-y-3'>
                <div className='font-bold mb-3'>GET IN TOUCH</div>
                <a href="tel:+254758725032">+254758725032</a>
                <a href="mailto:mwangiwahome70@gmail.com"></a>
                <div>Contact us</div>
                <div>Privacy policy</div>
             </div>
            </div>
        </div>
        
        <div className="flex justify-center items-center max-sm:mt-5">
            <p>Copyright All Rights Reserved</p>
        </div>
      
    </div>
      
    </div>
  )
}

export default Home
