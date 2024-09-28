import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import DoctorCard from "../components/DoctorCard";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterParameter, setFilterParameter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(4); // Changed to 6 for better display

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5750/api/doctors/fetchAllDoctors", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        if (data.doctors && data.doctors.length > 0) {
          setDoctors(data.doctors);
          toast.success("Doctors fetched successfully.");
        } else {
          toast.error("No doctors found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching doctors.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = filterParameter
    ? doctors.filter((doc) => doc.position === filterParameter)
    : doctors;

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const positions = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
    "Cardiologist",
  ].sort();

  return (
    <div className="flex flex-col mx-8 my-auto p-8">
      <Toaster position="top-left" />
      
      <div className="flex justify-between items-start gap-x-8">
        {/* Filter Section */}
        <div className="w-1/5 flex gap-y-3 flex-col">
          <div
            onClick={() => setFilterParameter("")}
            className={`border p-2 w-full cursor-pointer hover:bg-hover hover:text-white transition-colors ${
              filterParameter === "" ? "bg-hover text-white" : ""
            }`}
          >
            All Doctors
          </div>
          {positions.map((position, index) => (
            <div
              key={index}
              onClick={() => setFilterParameter(position)}
              className={`border p-2 w-full cursor-pointer hover:bg-hover hover:text-white transition-colors ${
                filterParameter === position ? "bg-hover text-white" : ""
              }`}
            >
              {position}
            </div>
          ))}
        </div>
        
        {/* Doctor Cards Section */}
        <div className="w-4/5 flex flex-wrap justify-evenly items-center gap-4 p-4">
          {loading && (
            <div className="flex justify-center items-center space-x-2 text-white p-3 bg-hover rounded-md shadow-md w-full">
              <p>Fetching doctors...</p>
              <FaSpinner className="animate-spin" />
            </div>
          )}
          {!loading && currentDoctors.length === 0 && (
            <p className="text-hover">No doctors found for the selected category.</p>
          )}
          {!loading &&
            currentDoctors.map((doc) => (
              <DoctorCard
                key={doc._id}
                image={doc.doctorImage}
                name={doc.username}
                role={doc.position}
                available={doc.available}
              />
            ))}
        </div>
      </div>

      {/* Pagination */}
      {!loading && filteredDoctors.length > doctorsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-hover text-white" : "bg-white text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}          
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;