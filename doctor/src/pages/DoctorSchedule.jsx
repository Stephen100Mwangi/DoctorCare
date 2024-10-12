import Calendar from "react-calendar"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const DoctorSchedule = () => {
    const [selectedDate] = useState(new Date());
    const localUrl = import.meta.env.VITE_LOCAL_URL;
    const apiURL = import.meta.env.VITE_API_URL;
    const baseUrl = localUrl || apiURL;

    const doctor = useSelector(state => state.doctorData.value);
    const doctorId = doctor.id;
       
    const [noOfAppointments,setNumberOfAppointments] = useState(0);

    const [appointmentsDates, setAppointmentsDates] = useState([]);
    const [todaySchedule,setTodaySchedule] = useState(0);

    const [doctorAppointments,setDoctorAppointments] = useState([]);

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
                console.log(appointmentsFound);
                const appointments = appointmentsFound.bookings;
                const filteredAppointments = appointments.filter(x=> x.doctor === doctorId);
                setNumberOfAppointments(filteredAppointments.length);
                setDoctorAppointments(filteredAppointments.slice(0,3));
               
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

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = date.toDateString();
            const isCancelled = cancelledApp.some(app => new Date(app.appointmentDate).toDateString() === dateStr);
            const isMissed = missedApp.some(app => new Date(app.appointmentDate).toDateString() === dateStr);
            
            if (isCancelled) {
                return (
                    <div className="relative w-full h-full">
                        <svg 
                            className="absolute top-0 right-0 w-3 h-3 text-red-500" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </div>
                );
            }
            
            if (isMissed) {
                return (
                    <div className="relative w-full h-full">
                        <svg 
                            className="absolute bottom-8 right-6 w-3 h-3 text-red-500" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            stroke="currentColor" 
                            strokeWidth="5"
                            aria-braillelabel="Missed appointments"
                        >
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                    </div>
                );
            }
        }
        return null;
    };

   const tileClassName = ({view, date}) => {
        if (view === 'month') {
            const today = new Date();
            const dateStr = date.toDateString();
            const isToday = dateStr === today.toDateString();
            const hasAppointment = appointmentsDates.some(eachAppointment => 
                eachAppointment.toDateString() === dateStr
            );
            const isCancelled = cancelledApp.some(app => 
                new Date(app.appointmentDate).toDateString() === dateStr
            );
            const isMissed = missedApp.some(app => 
                new Date(app.appointmentDate).toDateString() === dateStr
            );

            let classes = 'relative ';

            if (isToday && hasAppointment) {
                classes += 'bg-green-500 text-white rounded-sm';
            } else if (isToday) {
                classes += 'bg-blue-500 text-white outline border-blue-500';
            } else if (hasAppointment) {
                if (isCancelled) {
                    classes += 'bg-red-100 text-gray-800 rounded-sm';
                } else if (isMissed) {
                    classes += 'bg-red-50 text-gray-800 rounded-sm';
                } else {
                    classes += 'bg-yellow-500 text-white rounded-sm';
                }
            }
            
            return classes;
        }
        return null;
    }

  return (
    <div className="grid grid-cols-5 h-full items-center gap-10 justify-center pt-20">
        <Toaster position="top-left"></Toaster>
        <div className="flex p-6 px-0 items-start justify-start flex-col col-span-1 gap-5 shadow-xl">
            <div className="p-3 pl-8 text-xl text-center w-full text-hover">{noOfAppointments} appointments</div>
            <div className="p-3 pl-8 w-full hover:bg-green-500 hover:text-white cursor-text text-green-500 hover:shadow-sm">{completedApp.length} Completed appointments</div>
            <div className="p-3 pl-8 w-full hover:bg-black hover:text-white text-red-500 hover:shadow-sm">{cancelledApp.length} cancelled appointments</div>
            <div className="p-3 pl-8 w-full hover:bg-blue-500 hover:text-white text-blue-500 hover:shadow-sm">{upcomingApp.length} upcoming appointments</div>
            <div className="p-3 pl-8 w-full hover:bg-red-500 hover:text-white text-red-500 hover:shadow-sm">{missedApp.length}missed appointments</div>
        </div>
        <div className="flex col-span-4 p-6 justify-center items-center ">
            <Calendar tileContent={tileContent} className={'p-4 shadow-xl border-none'} value={selectedDate} tileClassName={tileClassName}></Calendar>
        </div>
       
    </div>
  )
}

export default DoctorSchedule
