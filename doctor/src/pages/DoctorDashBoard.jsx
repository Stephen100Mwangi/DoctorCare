import { useEffect, useState } from 'react';
import Loader from '../../../front/src/components/Loader'
import { useSelector } from 'react-redux';
import toast, {CheckmarkIcon, Toaster} from 'react-hot-toast'
import { MdNotificationsActive } from "react-icons/md";
import Calendar from 'react-calendar';
import { ImProfile } from "react-icons/im";
import { GoChecklist } from "react-icons/go";
import { IoCalendarNumber } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { ImPushpin } from "react-icons/im";
import { CiWarning } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import 'react-calendar/dist/Calendar.css'
import { Link } from 'react-router-dom';

const DoctorDashBoard = () => {
    const doctor = useSelector(state => state.doctorData.value);
    const doctorId = doctor.id;
    
    const localUrl = import.meta.env.VITE_LOCAL_URL;
    const apiURL = import.meta.env.VITE_API_URL;
    const baseUrl = localUrl || apiURL;
    const [loading,setLoading] = useState(false);
    const [loggedDoctor,setLoggedDoctor] = useState([]);

    const [noOfAppointments,setNumberOfAppointments] = useState(0);
    const [noOfPatients,setNumberOfPatients] = useState(0);

    const [selectedDate] = useState(new Date());
    const [appointmentsDates, setAppointmentsDates] = useState([]);
    const [todaySchedule,setTodaySchedule] = useState(0);

    const [doctorAppointments,setDoctorAppointments] = useState([]);

    const [completedApp,setCompletedApp] = useState([])
    const [upcomingApp,setUpcomingApp] = useState([])
    const [cancelledApp,setCancelledApp] = useState([])
    const [missedApp,setMissedApp] = useState([])

    useEffect(() => {
    async function fetchDoctorById() {
        if (!doctorId) {
            toast.error("Doctor must be logged in");
            console.log("Doctor must be logged in");
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/doctor/fetchDoctorById/${doctorId}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            if (!response.ok) {
                throw new Error("Cannot fetch doctor");
            }

            const doctorData = await response.json();
            console.log(doctorData);
            setLoggedDoctor(doctorData.user);
        } catch (error) {
            toast.error('Error fetching doctor');
            console.log(error.message);
            return;
        } finally {
            setLoading(false);
        }
    }
    fetchDoctorById();
}, [baseUrl, doctorId]);

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
                console.log(appointmentsFound);
                const appointments = appointmentsFound.bookings;
                const filteredAppointments = appointments.filter(x=> x.doctor === doctorId);
                setNumberOfAppointments(filteredAppointments.length);
                setDoctorAppointments(filteredAppointments.slice(0,3));
               
                //Unique patients 
                const uniquePatients = [...new Set(filteredAppointments.map(apt => apt.patient))];
                setNumberOfPatients(uniquePatients.length);

                //Appointment dates
                const appointmentDates = filteredAppointments.map(appointment => new Date(appointment.appointmentDate).toDateString());
                const uniqueDates = [...new Set(appointmentDates.map(appDate => new Date(appDate)))];

                setAppointmentsDates(uniqueDates);

                const todaysAppointments = filteredAppointments.filter(x => new Date(x.appointmentDate).toDateString() === selectedDate.toDateString());
                setTodaySchedule(todaysAppointments.length);  
                
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

    const tileClassName = ({view,date})=>{
        if (view === 'month') {
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const hasAppointment = appointmentsDates.some(eachAppointment => eachAppointment.toDateString() === date.toDateString());

            if (isToday && hasAppointment) {
                return 'bg-green-500 text-white rounded-sm'; // Today with appointment
            }
            if (isToday) {
                return 'bg-blue-500 text-white outline border-blue-500'; // Today without appointment
            }
            if (hasAppointment) {
                return 'bg-yellow-500 text-white rounded-sm'; // Appointment dates
            }            
        }
        return null;
    }

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 w-full">
        <Toaster position='top-left'></Toaster>
        {/* Quick Summary Card */}
        <div className="flex flex-col space-y-10 p-4 rounded-md shadow-md bg-white h-auto">
           <div className="flex items-center justify-center text-hover">
                <GoChecklist className="mr-2" />
                Quick Summary
            </div>
            <div className="flex flex-col space-y-5">
                <div className='flex items-center gap-8'>
                    <p>Total Patients</p>
                    <p className='font-mono'>{noOfPatients}</p>
                </div>
                <div className='flex items-center gap-8'>
                    <p>Appointments</p>
                    <p className='font-mono'>{noOfAppointments}</p>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='font-semibold'>Today&apos;s Schedule</p>
                    <p>You will be attending to <span className='font-mono mx-2 text-hover bg-white'>{todaySchedule}</span> {todaySchedule===1?"patient":"patients"} today</p>
                </div>

            </div>
        </div>

        {/* Doctors Card */}
        <div className="flex flex-col space-y-10 p-4 rounded-md shadow-md bg-white h-auto">
            <div className="flex items-center justify-center text-hover">
                <ImProfile className="mr-2" />
                Profile
            </div>
            {
                loading && <Loader text={"Fetching doctor...."}></Loader>
            }
            <div className="flex justify-between">
                <div className="flex flex-col gap-y-4">
                    <p>{doctor.username}</p>
                    <p>{doctor.email}</p>
                    <p>{loggedDoctor.position}</p>
                </div>
                <div className='h-48 w-40 rounded-md'>
                    <img src={loggedDoctor?.doctorImage} className='rounded-md h-[100%] object-cover' alt="" />
                </div>
            </div>
           
        </div>

        {/* Notifications Card - Spanning Two Rows */}
        <div className="flex flex-col space-y-2 md:col-span-1 md:row-span-2 p-4 rounded-md shadow-md bg-white h-[640px] overflow-y-scroll">
            <div className="flex items-center justify-center text-hover">
                <MdNotificationsActive className="mr-2" />
                Notifications
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex flex-col">
                    <div aria-label='You should have attended to theses cases by now' className="flex items-center gap-2 p-1 bg-red-500 text-white">
                        <h1>Missed appointments</h1>
                        <CiWarning></CiWarning>
                    </div>
                    <div className='border-t'>
                        {
                            missedApp.map(eachAppointment => <div className='flex flex-col space-y-3 p-2' key={eachAppointment._id}>
                                <div>{eachAppointment.condition}</div>
                                <div className='text-xs text-red-500'>
                                    Due date: {new Date(eachAppointment.appointmentDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    hour12: true 
                                    })}
                                </div>
                            </div>)
                        }

                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        cancelledApp.length>0 &&  
                        <div aria-label='You cancelled theses appointments' className="flex items-center gap-2 p-1 bg-white text-red-500 border border-red-500">
                            <h1>Cancelled appointments</h1>
                            <MdCancel></MdCancel>
                        </div>
                    }
                   
                    <div className='border-t'>
                        {
                            cancelledApp.map(eachAppointment => <div className='flex flex-col space-y-3 p-2' key={eachAppointment._id}>
                                <div>{eachAppointment.condition}</div>
                                <div className='text-xs text-black'>
                                    Due date: {new Date(eachAppointment.appointmentDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    hour12: true 
                                    })}
                                </div>
                            </div>)
                        }

                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        upcomingApp.length>0 &&
                        <div aria-label='You should have attended to theses cases by now' className="flex items-center gap-2 p-1 bg-blue-500 text-white">
                            <h1>Upcoming appointments</h1>
                            <MdOutlineWatchLater></MdOutlineWatchLater>
                        </div>
                    }
                   
                    <div className='border-t'>
                        {
                            upcomingApp.map(eachAppointment => <div className='flex flex-col space-y-3 p-2' key={eachAppointment._id}>
                                <div>{eachAppointment.condition}</div>
                                <div className='text-xs text-blue-500'>
                                    Due date: {new Date(eachAppointment.appointmentDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    hour12: true 
                                    })}
                                </div>
                            </div>)
                        }

                    </div>
                </div>
                <div className="flex flex-col">
                    {
                        completedApp.length>0 && 
                        <div aria-label='You have completed these appointments' className="flex items-center gap-2 p-1 bg-green-500 text-white">
                            <h1>Completed appointments</h1>
                            <FaCircleCheck></FaCircleCheck>
                        </div>
                    }
                   
                    <div className='border-t'>
                        {
                            completedApp.map(eachAppointment => <div className='flex flex-col space-y-3 p-2' key={eachAppointment._id}>
                                <div>{eachAppointment.condition}</div>
                                <div className='text-xs text-green-500'>
                                    Due date: {new Date(eachAppointment.appointmentDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    hour12: true 
                                    })}
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </div>

        {/* Appointment Widget */}
        <div className="flex flex-col space-y-5 p-4 rounded-md shadow-md bg-white h-auto">
            <div className="flex items-center justify-center text-hover">
                <FaUserFriends className="mr-2" />
                <Link to={'/doctor/appointments'}> Appointments</Link>
            </div>
            <div className='grid grid-cols-2 gap-10 justify-center items-center'>
                {
                    doctorAppointments.map(eachAppointment => <div className='rounded-md shadow-md p-3 flex flex-col gap-y-3' key={eachAppointment._id}>
                        <div className='line-clamp-1'>{eachAppointment.condition}</div>
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
                                eachAppointment.status === "Completed"?<CheckmarkIcon></CheckmarkIcon> :
                                eachAppointment.status === "Cancelled" ? <FaUserTimes></FaUserTimes> : 
                                eachAppointment.status === "Rescheduled" ? <MdOutlineWatchLater></MdOutlineWatchLater> :
                                <ImPushpin></ImPushpin>
                            }
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
                    </div>)
                }
            </div>
        </div>

        {/* My Schedule Card */}
        <div className="flex flex-col space-y-2 p-4 rounded-md shadow-md bg-white h-auto">
            <div className="flex items-center justify-center text-hover">
                <IoCalendarNumber className="mr-2" />
                My Schedule
            </div>
            <Calendar value={selectedDate}  tileClassName={tileClassName} className={"p-3 rounded-md"}></Calendar>
        </div>
    </div>
  )
}

export default DoctorDashBoard
