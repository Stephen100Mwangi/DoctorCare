import { FaClock } from "react-icons/fa6";
import { MdAutoDelete } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

const AppointmentCard = ({doctorsName, appointmentStatus, doctorsEmail, completeAppointment, cancelAppointment, rescheduleAppointment, doctorsSpecialization, patientsName,patientCondition,bookingTime,appointmentDate}) => {
  return (
    <div className='shadow-xl rounded-xl flex flex-col gap-y-7 p-5 max-w-[400px]'>
        <div className="flex flex-col gap-y-5">
            <div className="flex justify-start items-start gap-2">
                <span className='font-normal text-sm'>Patient ID</span>
                <h2 className='font-light text-sm'>{patientsName}</h2>
            </div>
            <div className="flex justify-start items-start gap-2">
                <span className='font-normal text-sm'>Condition</span>
                <h2 className='font-light text-sm line-clamp-1'>{patientCondition}</h2>
            </div>
        </div>
        <div className="flex flex-col gap-y-5 border-t pt-2">
            <div className="flex justify-start items-start gap-2">
                <span className='font-normal text-sm'>Doctor ID</span>
                <h2 className='font-light text-sm'>{doctorsName}</h2>
            </div>
            <div className="flex justify-start items-start gap-2">
                <span className='font-normal text-sm'>Doctor&apos;s Email</span>
                <h2 className='font-light text-sm'>{doctorsEmail}</h2>

            </div>
            <div className="flex justify-start items-start gap-2">
                <span className='font-normal text-sm'>Field of Specialization</span>
                <h2 className='font-light text-sm'>{doctorsSpecialization}</h2>
            </div>
        </div>
        <div className={`${appointmentStatus == "Scheduled"? 'text-blue-500':appointmentStatus == "Cancelled"?'text-red-500':'text-green-500'} text-xs`}>{appointmentStatus}</div>
        <div className="flex w-full gap-x-5 justify-evenly pt-5 p-3 bg-hover text-white border-t">
            <div className='flex flex-col justify-start items-start gap-y-3'>
                <span className='font-normal text-sm'>Date of Appointment</span>
                <h2 className='font-light text-xs font-mono'>{appointmentDate}</h2>

            </div>
            <div className='flex flex-col justify-start items-start gap-y-3'>
                <span className='font-normal text-sm'>Date of Booking</span>
                <h2 className='font-light text-xs font-mono'>{bookingTime}</h2>
            </div>
        </div>

        <div className="flex justify-evenly items-center flex-wrap gap-5">
            <div onClick={rescheduleAppointment} className="flex items-center gap-3 text-xs justify-center bg-hover text-white p-2 cursor-pointer hover:rounded-full px-4">
                <span>Reschedule</span>
                <FaClock></FaClock>
            </div>
            <div onClick={cancelAppointment} className="flex items-center gap-3 text-xs justify-center bg-red-500 text-white p-2 cursor-pointer hover:rounded-full px-4">
                <span>Cancel</span>
                <MdAutoDelete></MdAutoDelete>
            </div>
            <div onClick={completeAppointment} className="flex items-center gap-3 text-xs justify-center bg-green-500 text-white p-2 cursor-pointer hover:rounded-full px-4">
                <span>Complete</span>
                <IoMdCheckmarkCircleOutline></IoMdCheckmarkCircleOutline>
            </div>
            
        </div>
      
    </div>
  )
}

AppointmentCard.propTypes = {
    doctorsName: PropTypes.string,
    doctorsEmail: PropTypes.string,
    rescheduleAppointment: PropTypes.func,
    cancelAppointment: PropTypes.func,
    completeAppointment: PropTypes.func,
    doctorsSpecialization: PropTypes.string,
    patientsName: PropTypes.string,
    patientCondition: PropTypes.string,
    bookingTime: PropTypes.string,
    appointmentDate: PropTypes.string,
    appointmentStatus: PropTypes.string
}

export default AppointmentCard
