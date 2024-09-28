import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DoctorCard from "../../components/DoctorCard";
import Button from "../../components/Button";

const ReadDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // To manage loading state

  // Fetch all doctors on component mount and whenever `isUpdating` changes
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5750/api/doctors/fetchAllDoctors");
        if (!response.ok) {
          throw new Error("Error fetching doctors");
        }

        const data = await response.json();
        setDoctors(data.doctors);
        toast.success("Doctors fetched successfully");
      } catch (error) {
        console.error(error.message);
        toast.error(error.message || "Internal server error");
      }
    };

    fetchDoctors();
  }, [isUpdating]); // Re-fetch when `isUpdating` changes to reflect availability updates

  // Function to open the modal and set the selected doctor
  const ManageDoctor = (id) => {
    setSelectedDoctorId(id);
    setModal(true);
  };

  // Function to toggle doctor's availability
  const changeDoctorAvailability = async () => {
    if (!selectedDoctorId) {
      toast.error("No doctor selected");
      return;
    }

    setIsUpdating(true); // Start loading

    try {
      const response = await fetch(`http://localhost:5750/api/doctor/updateAvailability/${selectedDoctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Attempt to parse error message from backend
        const errorData = await response.json();
        throw new Error(errorData.message || "Doctor availability update failed");
      }else{

      const updatedDoctor = await response.json();
      toast.success(`${updatedDoctor.doctor.username} availability updated successfully`);
      
      // Update local state without re-fetching all doctors
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === selectedDoctorId ? { ...doctor, available: updatedDoctor.doctor.available } : doctor
        )
      );

      setModal(false); // Close the modal
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error updating doctor availability: " + error.message);
    } finally {
      setIsUpdating(false); // End loading
      setSelectedDoctorId(null); // Reset selected doctor
    }
  };

  // Function to close the modal
  const hideModal = () => {
    setModal(false);
    setSelectedDoctorId(null); // Reset selected doctor
  };

  return (
    <div className="relative">
      <div className="flex p-8 justify-evenly items-center flex-wrap relative">
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
            <Button clickFunction={() => ManageDoctor(doctorItem._id)} text="Manage Availability" />
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={hideModal} // Close modal when clicking on backdrop
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 id="modal-title" className="text-xl font-bold text-center">
              Do you wish to change the doctor&apos;s availability?
            </h2>
            <div className="flex justify-between gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={hideModal}
                disabled={isUpdating} // Disable button while updating
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  isUpdating
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={changeDoctorAvailability}
                disabled={isUpdating} // Disable button while updating
              >
                {isUpdating ? "Updating..." : "Change"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadDoctors;
