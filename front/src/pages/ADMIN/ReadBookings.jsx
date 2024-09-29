/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AppointmentCard from "../../components/AppointmentCard";

const ReadBookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(3);
  const [modalState, setModalState] = useState({
    reschedule: false,
    cancel: false,
    complete: false,
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState(null);
  const [dateForm, setDateForm] = useState(false);

  useEffect(() => {
    fetchAppointments();
  });

  const localURL = import.meta.env.VITE_LOCAL_URL;
  const apiUrl= import.meta.env.VITE_API_URL;

  const baseUrl = localURL || apiUrl;

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/viewAllAppointments`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data.bookings);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, i) => i + 1);

  const toggleModal = (modalType, appointmentId = null) => {
    setModalState(prev => ({ ...prev, [modalType]: !prev[modalType] }));
    setSelectedAppointment(appointmentId);
    if (modalType === 'reschedule') {
      setDateForm(false);
    }
  };

  const handleMarkAsComplete = async () => {
    if (!selectedAppointment) return;
    try {
      const response = await fetch(`${baseUrl}/api/appointment/markComplete/${selectedAppointment}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to mark as complete');
      updateAppointmentState(data.appointment);
      toast.success(data.message);
      toggleModal('complete');
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;
    try {
      const response = await fetch(`${baseUrl}/api/appointment/cancelAppointment/${selectedAppointment}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to cancel appointment');
      updateAppointmentState(data.appointment);
      toast.success(data.message);
      toggleModal('cancel');
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !date) {
      toast.error("Date cannot be empty");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/appointment/reschedule/${selectedAppointment}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to reschedule appointment');
      updateAppointmentState(data.appointment);
      toast.success(data.message);
      toggleModal('reschedule');
      setDate(null);
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred");
    }
  };

  const updateAppointmentState = (updatedAppointment) => {
    setAppointments(prev => prev.map(appointment => 
      appointment._id === updatedAppointment._id ? updatedAppointment : appointment
    ));
  };

  return (
    <div className="p-8 relative">
      <Toaster position="top-left" />
      <div className="flex flex-wrap justify-center gap-4">
        {currentAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            doctorsEmail={appointment?.doctorEmail}
            patientCondition={appointment.condition}
            patientsName={`${appointment.patient.slice(0, 16)}********`}
            doctorsName={`${appointment.doctor.slice(0,16)}********`}
            bookingTime={appointment.bookingTime}
            appointmentDate={appointment.appointmentDate}
            appointmentStatus={appointment.status}
            rescheduleAppointment={() => toggleModal('reschedule', appointment._id)}
            cancelAppointment={() => toggleModal('cancel', appointment._id)}
            completeAppointment={() => toggleModal('complete', appointment._id)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-20">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      
      {modalState.reschedule && (
        <Modal
          title="Reschedule Appointment"
          message="Would you like to reschedule this appointment to a new date and time? Rescheduling may inconvenience the patient, so please confirm your decision."
          onCancel={() => toggleModal('reschedule')}
          onConfirm={() => setDateForm(true)}
          confirmText="Yes, Reschedule Appointment"
        >
          {dateForm && (
            <form className="mt-4">
              <label htmlFor="appointmentDate" className="block mb-2">New Appointment Date</label>
              <input 
                type="datetime-local" 
                name="appointmentDate" 
                id="appointmentDate" 
                min={new Date().toISOString().slice(0, 16)} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <button onClick={handleRescheduleAppointment} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Update Date
              </button>
            </form>
          )}
        </Modal>
      )}

      {modalState.cancel && (
        <Modal
          title="Cancel Appointment"
          message="Are you sure you want to cancel this appointment? Cancelling the appointment could disrupt the patient's plans. Please confirm if you wish to proceed."
          onCancel={() => toggleModal('cancel')}
          onConfirm={handleCancelAppointment}
          confirmText="Yes, Cancel Appointment"
        />
      )}

      {modalState.complete && (
        <Modal
          title="Complete Appointment"
          message="Do you want to mark this appointment as complete? Once marked as complete, this appointment will no longer be available for attendance or modifications."
          onCancel={() => toggleModal('complete')}
          onConfirm={handleMarkAsComplete}
          confirmText="Yes, Mark as Complete"
        />
      )}
    </div>
  );
};

const Modal = ({ title, message, onCancel, onConfirm, confirmText, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      {children}
      <div className="flex justify-end gap-4 mt-6">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          {confirmText}
        </button>
      </div>
    </div>
  </div>
);

export default ReadBookings;