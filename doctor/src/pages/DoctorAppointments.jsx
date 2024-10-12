/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import toast, {CheckmarkIcon, Toaster} from 'react-hot-toast'
import { useSelector } from "react-redux";

import { FaUserTimes } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { ImPushpin } from "react-icons/im";

const DoctorAppointments = () => {

  const localUrl = import.meta.env.VITE_LOCAL_URL;
  const apiURL = import.meta.env.VITE_API_URL;
  const baseUrl = localUrl || apiURL;

  const [doctorAppointments,setDoctorAppointments] = useState([])
  const doctor = useSelector(state => state.doctorData.value);
  const doctorId = doctor.id;
  const [selectedDate] = useState(new Date());

  const [completeModal,setCompleteModal] = useState(false);
  const [cancelModal,setCancelModal] = useState(false);
  const [rescheduleModal,setRescheduleModal] = useState(false);
  const [selectedId,setSelectedId] = useState(null);

  const [canReschedule,setCanReschedule] = useState(false);
  const [canCancel,setCanCancel] = useState(false);
  const [canComplete,setCanComplete] = useState(false);

  const [completedApp,setCompletedApp] = useState([])
  const [upcomingApp,setUpcomingApp] = useState([])
  const [cancelledApp,setCancelledApp] = useState([])
  const [missedApp,setMissedApp] = useState([])

  useEffect(() => {
        if (!doctor || !doctorId) {
           toast.error("You must log in first") 
        }

        async function fetchAppointments() {
            try {
                const response = await fetch(`${baseUrl}/api/admin/viewAllAppointments`)
                if (!response.ok) {
                    toast.error('Could not fetch appointments');
                    return;
                }

                const appointmentsFound = await response.json();
                const appointments = appointmentsFound.bookings;
                const filteredAppointments = appointments.filter(x=> x.doctor === doctorId);
                setDoctorAppointments(filteredAppointments);
               
                // Due appointments
                const dueAppointments = filteredAppointments.filter(eachAppointment => new Date(eachAppointment.appointmentDate).getTime() < selectedDate.getTime());
                setMissedApp(dueAppointments);

                // Upcoming
                const upcomingAppointments = filteredAppointments.filter(eachAppointment => new Date(eachAppointment.appointmentDate).getTime() >= selectedDate.getTime())
                setUpcomingApp(upcomingAppointments);

                // Complete 
                const completeAppointments = filteredAppointments.filter(eachAppointment =>eachAppointment.status === "Completed");
                setCompletedApp(completeAppointments);

                // Cancelled
                const cancelledAppointments = filteredAppointments.filter(eachAppointment => eachAppointment.status === "Cancel");
                setCancelledApp(cancelledAppointments);
                
                
            } catch (error) {
                toast.error('Error fetching appointments');
                console.log(error.message);
                return;
            }
        }

        fetchAppointments(); 
    }, [doctor,doctorId,baseUrl,selectedDate])

    
    async function cancelAppointment(id) {
      setSelectedId(id)
      setCancelModal(prev => !prev)
    }

    async function rescheduleAppointment(id) {
      setSelectedId(id)
      setRescheduleModal(prev => !prev)
    
      const response = await fetch()
    }


    async function markAppointmentAsComplete(id) {
      setSelectedId(id)

      setCompleteModal(prev => !prev)

      
    }
  return (
    <div className="flex flex-col space-y-10 px-8">
      <Toaster position="top-left"></Toaster>
      <div className="text-center mx-auto my-10 font-medium p-4 text-xl border-b-2">My Appointments</div>
      {
         <div className='flex flex-wrap justify-evenly gap-10  items-center'>
                {
                    doctorAppointments.map(eachAppointment =>
                    <div className='relative rounded-md shadow-md w-80 p-3 flex flex-col gap-y-3' key={eachAppointment._id}>
                      <div>{eachAppointment.patientEmail}</div>
                      <div className='h-20'>{eachAppointment.condition}</div>
                      <div className='text-xs'>
                        {new Date(eachAppointment.bookingTime).toLocaleDateString('en-US',{
                          year:'numeric',
                          month:'long',
                          day:'numeric',
                          hour:'2-digit',
                          minute:'2-digit',
                          hour12:true
                        })}
                      </div>
                      <div className='text-xs'>{new Date(eachAppointment.appointmentDate).toLocaleDateString('en-US',
                        {
                          year:'numeric',
                          month:'long',
                          day:'numeric',
                          hour:'2-digit',
                          minute:'2-digit',
                          hour12:true
                        }
                      )}</div>
                      <div 
                        className={`${eachAppointment.status === "Scheduled" 
                            ? 'bg-blue-500' 
                            : eachAppointment.status === "Completed" 
                            ? 'bg-emerald-500' 
                            : eachAppointment.status === "Cancelled" 
                                ? 'bg-red-500' 
                                : 'bg-black'}`} 
                        style={{ color: 'white', display:'flex',alignItems:'center' , justifyContent:'center', gap:'20px',padding:'5px' }} // Alternatively, use Tailwind class for text color
                        >
                        <span>{eachAppointment.status}</span>
                        {
                            eachAppointment.status === "Completed"?<CheckmarkIcon/> :
                            eachAppointment.status === "Cancelled" ? <FaUserTimes></FaUserTimes> : 
                            eachAppointment.status === "Rescheduled" ? <MdOutlineWatchLater></MdOutlineWatchLater> :
                            <ImPushpin></ImPushpin>
                        }
                      </div>

                      <div className="flex justify-evenly">
                        <button className="text-sm text-white p-1 px-2.5 rounded-sm hover:rounded-full bg-red-500" onClick={()=>cancelAppointment(eachAppointment._id)}>Cancel</button>
                        <button className="text-sm text-white p-1 px-2.5 rounded-sm hover:rounded-full bg-blue-500" onClick={()=>rescheduleAppointment(eachAppointment._id)}>Reschedule</button>
                        <button className="text-sm text-white p-1 px-2.5 rounded-sm hover:rounded-full bg-green-500" onClick={()=>markAppointmentAsComplete(eachAppointment._id)}>Mark as Complete</button>
                      </div>

                     
                      <div className={`absolute p-1 text-white top-5 right-3 text-xs 
                        ${eachAppointment.status === "Completed"
                          ? 'bg-green-500'
                          : eachAppointment.status === 'Cancelled'
                          ? 'bg-black line-through'
                          : new Date(eachAppointment.appointmentDate).getTime() < new Date(selectedDate).getTime()
                          ? 'bg-red-500' 
                          : new Date(eachAppointment.appointmentDate).getTime() > new Date(selectedDate).getTime()
                          ? 'bg-blue-500':'bg-slate-300'
                        }`}                          
                        >
                        {(() => {
                          if (eachAppointment.status === "Completed") return "Completed";
                          if (eachAppointment.status === "Cancelled") return "Cancelled";
                          
                          const appointmentTime = new Date(eachAppointment.appointmentDate).getTime();
                          const selectedTime = selectedDate.getTime();
                          
                          if (appointmentTime < selectedTime) return "Missed";
                          if (appointmentTime > selectedTime) return "Upcoming";
                          return "";
                        })()}
                      </div>
                    </div>)
                }
            </div>
      }


      {/* Cancel Appointment */}
      {
        cancelModal &&  
        <div className="flex flex-col absolute top-[10%] left-[5%] z-50 space-y-3 w-80 bg-white shadow-2xl p-3 text-black rounded-md">
          <p className="font-medium">Do you want to cancel this appointment?</p>
          <p className="font-light">Once you cancel this appointment you can no longer serve your patient.This action cannot be undone</p>
          <div className="flex justify-between">
            <button onClick={()=>setCancelModal(prev => !prev)} className="text-green-500 p-2 px-3 bg-black bg-opacity-10 text-sm rounded-sm hover:rounded-lg">Cancel action</button>
            <button onClick={()=>setCanCancel(prev => !prev)} className="bg-red-500 text-white p-2 px-3 text-sm rounded-sm hover:rounded-lg">Yes,Cancel appointment</button>
          </div>
        </div>
      }


      
      {/* Reschedule Appointment */}
      {
        rescheduleModal && 
        <div className="flex flex-col absolute top-[10%] left-[5%] z-50 space-y-3 w-80 bg-white shadow-2xl p-3 text-black rounded-md">
          <p className="font-medium">Do you want to reschedule this appointment?</p>
          <p className="font-light">Rescheduling this appointment may inconvenience your patient.This action cannot be undone</p>
          <div className="flex justify-between">
            <button onClick={()=>setRescheduleModal(prev => !prev)} className="text-green-500 p-2 px-3 bg-black bg-opacity-10 text-sm rounded-sm hover:rounded-lg">Cancel action</button>
            <button onClick={()=>setCanReschedule(prev => !prev)} className="bg-red-500 text-white p-2 px-3 text-sm rounded-sm hover:rounded-lg">Reschedule appointment</button>
          </div>
        </div>
      }
      
      {/* Mark as Complete */}
      {
        completeModal &&  
        <div className="flex flex-col absolute top-[10%] left-[5%] z-50 space-y-3 w-80 bg-white shadow-2xl p-3 text-black rounded-md">
          <p className="font-medium">Do you want to complete this appointment</p>
          <p className="font-light">Marking this appointment as complete may inconvenience your patient.This action cannot be undone</p>
          <div className="flex justify-between">
            <button onClick={()=>setCompleteModal(prev => !prev)} className="text-green-500 p-2 px-3 bg-black bg-opacity-10 text-sm rounded-sm hover:rounded-lg">Cancel action</button>
            <button onClick={()=>setCanComplete(prev => !prev)} className="bg-red-500 text-white p-2 px-3 text-sm rounded-sm hover:rounded-lg">Mark as complete</button>
          </div>
        </div>
      }
      
    </div>
  )
}

export default DoctorAppointments
