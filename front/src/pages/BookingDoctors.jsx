/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import DoctorCard from "../components/DoctorCard";
import Button from "../components/Button";

const BookingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [bookDoctor, setBookDoctor] = useState(false);
  const patient = useSelector((state) => state.patientData.value);
  
  const patientID = patient.id;
  const patientEMAIL = patient.email;

  const [formData, setFormData] = useState({
    doctorId: "",
    patientId: patientID,
    condition: "",
    appointmentDate: "",
    bookingTime: "",
    doctorEmail:"",
    patientEmail:patientEMAIL
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all available doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5750/api/doctors/fetchAllDoctors");
        if (!response.ok) {
          toast.error("Error fetching doctors");
        } else {
          const data = await response.json();
          setDoctors(data.doctors.filter((x) => x.available));
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Internal server error");
      }
    };

    fetchDoctors();
  }, []);

  // Handle doctor selection
  const selectDoctor = async (id,email) => {
    setBookDoctor(true);
    setFormData((prevData) => ({
      ...prevData,
      doctorId: id,
      condition: "",
      appointmentDate: "",
      bookingTime: "",
      doctorEmail:email,
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate formData if necessary
    if (!formData.condition || !formData.appointmentDate || !formData.bookingTime) {
      toast.error("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5750/api/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to book appointment");
      }

      const result = await response.json();
      toast.success("Appointment booked successfully!");
      // Reset form and close modal
      setBookDoctor(false);
      setFormData({
        doctorId: "",
        patientId: patientID, // Ensure patientId is set
        condition: "",
        appointmentDate: "",
        bookingTime: "",
        doctorEmail:"",
        patientEmail:patientEMAIL
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Error booking appointment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close (e.g., when clicking outside the modal or on a cancel button)
  const closeModal = () => {
    setBookDoctor(false);
    setFormData({
      doctorId: "",
      patientId: patientID, // Ensure patientId is set
      condition: "",
      appointmentDate: "",
      bookingTime: "",
      doctorEmail:"",
      patientEmail:patientEMAIL
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  const getCurrentDateTimeRoundedUp = () => {
  const now = new Date();
  // Add 1 minute if the seconds are not zero
  if (now.getSeconds() > 0) {
    now.setMinutes(now.getMinutes() + 1);
  }
  return now.toISOString().slice(0, 16); // Formats as YYYY-MM-DDTHH:MM
};

// Use this function to get the current date and time
const currentDateTime = getCurrentDateTimeRoundedUp();

  return (
    <div className="flex flex-col gap-y-20 items-center justify-center">
      <div className="flex flex-wrap justify-start items-start gap-10 p-8 inset-0">
        <Toaster position="top-left" className="z-50" />
        {doctors.map((doctorItem) => (
          <div
            key={doctorItem._id}
            className="flex flex-col bg-white shadow-lg rounded-lg p-3 space-y-5 justify-center items-center cursor-pointer"
          >
            <DoctorCard
              image={doctorItem.doctorImage}
              role={doctorItem.position}
              name={doctorItem.username}
              available={doctorItem.available}
            />
            <Button clickFunction={() => selectDoctor(doctorItem._id,doctorItem.email)} text="Book Appointment" />
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {bookDoctor && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeModal} // Close modal when clicking on backdrop
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-12 w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <form className="flex flex-col gap-12">
              <div className="font-bold text-2xl text-center" id="modal-title">
                Book Appointment
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {/* Doctor Information */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="doctorId" className="font-medium">
                      Doctor
                    </label>
                    <select
                      id="doctorId"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={formData.doctorId}
                      onChange={(e) =>
                        setFormData({ ...formData, doctorId: e.target.value })
                      }
                      required
                    >
                      <option value="">Select a Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.username} - {doctor.position}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="condition" className="font-medium">
                      Condition
                    </label>
                    <textarea
                      id="condition"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                      cols={30}
                      rows={4}
                      placeholder="Describe your condition..."
                      value={formData.condition}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="bookingTime" className="font-medium">
                      Booking Time
                    </label>
                    <input
                      id="bookingTime"
                      className="p-3 border border-gray-300 rounded-md bg-gray-100"
                      type="datetime-local"
                      value={formData.bookingTime}
                      min={currentDateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="appointmentDate" className="font-medium">
                      Appointment Date
                    </label>
                    <input
                      id="appointmentDate"
                      className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      type="date"
                      value={formData.appointmentDate}
                      min={today}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div id="bookingActions" className="flex justify-end">
                <Button
                  type="button"
                  text="Cancel"
                  clickFunction={closeModal}
                  className="bg-red-500"
                />
                <Button
                  type="submit"
                  text={isSubmitting ? "Booking..." : "Book Appointment"}
                  disabled={isSubmitting}
                  className="mr-4"
                  clickFunction={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDoctors;
