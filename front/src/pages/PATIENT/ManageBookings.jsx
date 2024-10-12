/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AppointmentCard from "../../components/AppointmentCard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const ManageBookings = () => {
  const localUrl = import.meta.env.VITE_LOCAL_URL;
  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = localUrl || apiURL;

  const [myAppointments,setAppointments] = useState([]);
  const patientUser = useSelector((state)=>state.patientData.value);
  const userID = patientUser.id;

  useEffect(()=>{
    async function fetchAppointments() {
      try {
        if (!userID) {
          toast.error("User must be logged in")
        }
        const response = await fetch(`${baseUrl}/patient/fetchMyAppointments`,{
          method:"POST",
          headers:{
            "Content-Type":'application/json'
          },
          body: JSON.stringify({userID})
        })

        if (!response.ok) {
          toast.error("Error fetching appointment")
        }

        const data = await response.json();
        if (data.message === `Empty bookings`) {
          toast.error("You do not have any appointment yet")
          return;          
        }

        console.log(data);
        
        

      
    } catch (error) {
      toast.error("Error fetching user appointments");
      console.log(error.message);
      return;    
    }
      
    }
    

    fetchAppointments();
  },[])
  return (
    <div>
      <Toaster position="top-left"></Toaster>
      Manage your bookings here

      {/* {
        myAppointments.map((eachAppointment)=> <AppointmentCard key={eachAppointment._id}></AppointmentCard>)
      } */}
      
    </div>
  )
}

export default ManageBookings
