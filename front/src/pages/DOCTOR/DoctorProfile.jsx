import { useSelector } from "react-redux"
import { useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import toast from "react-hot-toast";
import { useState } from "react";

const DoctorProfile = () => {
  const userData = useSelector(state => state.doctorData.value);
  const { id } =userData;
  const [doctorData,setDoctorData] = useState({});

  useEffect(() => {
    async function fetchDoctorById() {
      try {
        const response = await fetch(`http://localhost:5750/api/doctors/findById/${id}`);

        if (!response.ok) {
          toast.error("Error fetching doctor");
          return;
        }

        const data = await response.json();
        setDoctorData(data);
        console.log(data);
      } catch (error) {
        toast.error("An error occurred while fetching doctor data");
        console.error(error);
      }     
      
    }

    if (id) { // Ensure we have an id before making the request
      fetchDoctorById();
    }
  
  }, [id])
  return (
    <div className='flex justify-start h-[calc(100vh-120px)] w-full'>
      <div className="w-1/5 bg-slate-100 p-2">
      <DoctorCard image={doctorData.doctorImage} name={userData.username} role={doctorData.position} available={doctorData.available}></DoctorCard>
      <p>{userData.email}</p>
      </div>
      <div className="w-4/5 p-5">
        <h1 className="text-card">My <span className="text-black">Bookings</span> </h1>
      </div>
    </div>
  )
}

export default DoctorProfile
