import { useState, useEffect } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { SlGraph } from "react-icons/sl";
import { GiArmBandage } from "react-icons/gi";
import { CgCalendarToday } from "react-icons/cg";
import { HiPhoneMissedCall } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

const localUrl = import.meta.env.VITE_LOCAL_URL;
const apiURL = import.meta.env.VITE_API_URL;
const baseUrl = localUrl || apiURL;

// Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register the required elements
ChartJS.register(
  ArcElement, // Required for Pie charts
  Tooltip,
  Legend,
  BarElement, // Required for Bar charts
  CategoryScale,
  LinearScale,
  Title
);

const AdminHero = () => {
  const [noOfDoctors, setDoctors] = useState(0);
  const [noOfPatients, setPatients] = useState(0);
  const [noOfAppointments, setAppointments] = useState(0);
  const [todaysAppointments, setTodaysAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [missedAppointments, setMissedAppointments] = useState(0);

  const [cardiologist, setCardiologist] = useState(0);
  const [dermatologist, setDermatologist] = useState(0);
  const [gastroenterologist, setGastroenterologist] = useState(0);
  const [generalPhysician, setGeneralPhysician] = useState(0);
  const [gynecologist, setGynecologist] = useState(0);
  const [neurologist, setNeurologist] = useState(0);
  const [pediatrician, setPediatrician] = useState(0);

  const [maleDoctors, setMaleDoctors] = useState(0);
  const [femaleDoctors, setFemaleDoctors] = useState(0);

  const [malePatients, setMalePatients] = useState(0);
  const [femalePatients, setFemalePatients] = useState(0);

  const [infantPatients, setInfantPatients] = useState(0); // 0-2
  const [childPatients, setChildPatients] = useState(0); // 3-12
  const [teenPatients, setTeenPatients] = useState(0); // 13-19
  const [youngAdultPatients, setYoungAdultPatients] = useState(0); // 20-35
  const [adultPatients, setAdultPatients] = useState(0); // 36-69
  const [patientsAbove70, setPatientsAbove70] = useState(0); // Above 70

  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch(
        `${baseUrl}/api/doctors/fetchAllDoctors`
      );
      if (!response.ok) {
        toast.error("Error fetching doctors");
      }

      const data = await response.json();
      const availableDoctors = data.doctors;
      if (availableDoctors.length < 1) {
        toast.custom("No Doctors found");
      }
      setDoctors(availableDoctors.length);
    }

    fetchDoctors();
  }, []);

  function getYearDifference(startYear) {
    const startValue = new Date(startYear);
    const stopValue = new Date();

    // Get the total difference in milliseconds
    const totalDiff = stopValue - startValue;

    const years = Math.floor(totalDiff / (1000 * 60 * 60 * 24 * 365));
    const remainingMonths = totalDiff % (1000 * 60 * 60 * 24 * 365);
    const months = Math.floor(
      remainingMonths / (1000 * 60 * 60 * 24 * (365 / 12))
    );
    const remainingWeeks = remainingMonths % (1000 * 60 * 60 * 24 * (365 / 12));
    const weeks = Math.floor(remainingWeeks / (1000 * 60 * 60 * 24 * 7));
    const remainingDays = remainingWeeks % (1000 * 60 * 60 * 24 * 7);
    const days = Math.floor(remainingDays / (1000 * 60 * 60 * 24));

    // Categorizing patients based on years
    if (years >= 70) {
      setPatientsAbove70((prev) => prev + 1);
    } else if (years >= 36) {
      setAdultPatients((prev) => prev + 1);
    } else if (years >= 20) {
      setYoungAdultPatients((prev) => prev + 1);
    } else if (years >= 13) {
      setTeenPatients((prev) => prev + 1);
    } else if (years >= 3) {
      setChildPatients((prev) => prev + 1);
    } else {
      setInfantPatients((prev) => prev + 1);
    }

    return { years, months, weeks, days };
  }

  useEffect(() => {
    async function fetchPatients() {
      const response = await fetch(
        `${baseUrl}/api/patients/fetchAllPatients`
      );
      if (!response.ok) {
        toast.error("Error fetching patients");
      }
      const data = await response.json();
      const availablePatients = data.patients;
      if (availablePatients.length < 1) {
        toast.custom("No patients found");
      }
      setPatients(availablePatients.length);

      setMalePatients(
        availablePatients.filter(
          (eachPatient) => eachPatient?.gender === "Male"
        ).length
      );
      setFemalePatients(
        availablePatients.filter(
          (eachPatient) => eachPatient?.gender === "Female"
        ).length
      );

      availablePatients.forEach((eachPatient) => {
        getYearDifference(eachPatient?.dateOfBirth);
      });
    }

    fetchPatients();
  }, []);

  useEffect(() => {
    async function fetchAppointments() {
      const response = await fetch(
        `${baseUrl}/api/admin/viewAllAppointments`
      );
      if (!response.ok) {
        toast.error("Error fetching appointments");
      }

      const data = await response.json();
      const availableAppointments = data.bookings;
      console.log(availableAppointments);

      if (availableAppointments.length < 1) {
        toast.custom("No appointments found");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setAppointments(availableAppointments.length);
      const appointmentsToday = availableAppointments.filter(
        (eachAppointment) =>
          new Date(eachAppointment.appointmentDate).getTime() ===
          today.getTime()
      );
      setTodaysAppointments(appointmentsToday.length);

      const appointmentsMissed = availableAppointments.filter(
        (eachAppointment) =>
          new Date(eachAppointment.appointmentDate).getTime() < today.getTime()
      );
      setMissedAppointments(appointmentsMissed.length);

      const appointmentsComing = availableAppointments.filter(
        (eachAppointment) =>
          new Date(eachAppointment.appointmentDate).getTime() > today.getTime()
      );
      setUpcomingAppointments(appointmentsComing.length);
    }

    fetchAppointments();
  }, []);

  useEffect(() => {
    async function fetchAllDoctors() {
      try {
        const response = await fetch(
          `${baseUrl}/api/doctors/fetchAllDoctors`
        );
        if (!response.ok) {
          toast.error("Error fetching ");
        }

        const data = await response.json();
        const doctors = data.doctors;

        setCardiologist(
          doctors.filter((eachDoctor) => eachDoctor.position === "Cardiologist")
            .length
        );
        setDermatologist(
          doctors.filter(
            (eachDoctor) => eachDoctor.position === "Dermatologist"
          ).length
        );
        setGastroenterologist(
          doctors.filter(
            (eachDoctor) => eachDoctor.position === "Gastroenterologist"
          ).length
        );
        setGeneralPhysician(
          doctors.filter(
            (eachDoctor) => eachDoctor.position === "General Physician"
          ).length
        );
        setGynecologist(
          doctors.filter((eachDoctor) => eachDoctor.position === "Gynecologist")
            .length
        );
        setNeurologist(
          doctors.filter((eachDoctor) => eachDoctor.position === "Neurologist")
            .length
        );
        setPediatrician(
          doctors.filter((eachDoctor) => eachDoctor.position === "Pediatrician")
            .length
        );
      } catch (error) {
        toast.error("Internal server error:" + error.message);
      }
    }

    fetchAllDoctors();
  });

  // Register the necessary Chart.js components
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

  const chartData = {
    labels: [
      "Todays appointments",
      "Upcoming appointments",
      "Missed appointments",
    ],
    datasets: [
      {
        label: "Appointments",
        data: [todaysAppointments, upcomingAppointments, missedAppointments],
        backgroundColor: ["#0D92F4", "#347928", "#C62E2E"],
        borderColor: ["#0D92F4", "#347928", "#C62E2E"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointment Overview",
      },
    },
  };

  const doctorsData = {
    labels: [
      "Cardiologist",
      "Dermatologist",
      "Gastroenterologist",
      "General Physician",
      "Gynecologist",
      "Neurologist",
      "Pediatrician",
    ],
    datasets: [
      {
        label: "All Doctors",
        data: [
          cardiologist,
          dermatologist,
          gastroenterologist,
          generalPhysician,
          gynecologist,
          neurologist,
          pediatrician,
        ],
        backgroundColor: [
          "#0D92F4",
          "#347928",
          "#C62E2E",
          "#EC8305",
          "#161D6F",
          "#9DBDFF",
          "#E85C0D",
        ],
      },
    ],
  };

  const patientsData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Patient Distribution by Gender",
        data: [malePatients, femalePatients],
        backgroundColor: ["#0D92F4", "#347928"],
      },
    ],
  };
  const patientsDataByAge = {
    labels: [
      "Infants [0-2]",
      "Children [3-12]",
      "Teens [13-19]",
      "Young Adults [20-35]",
      "Adults [36-69]",
      "Aged [above 70]",
    ],
    datasets: [
      {
        label: "Patients by Age",
        data: [
          infantPatients,
          childPatients,
          teenPatients,
          youngAdultPatients,
          adultPatients,
          patientsAbove70,
        ],
        backgroundColor: [
          "#0D92F4",
          "#347928",
          "#C62E2E",
          "#EC8305",
          "#161D6F",
          "#9DBDFF",
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-4 grid-rows-3 p-8 gap-8 grid-flow-rows h-fit">
      <Toaster position="top-left" />
      <div className="bg-animateCard rounded-lg shadow-xl flex flex-col col-span-3 row-span-1 p-10 justify-between">
        <h1 className="text-center text-xl font-medium">
          Key Performance Information
        </h1>
        <div className="flex items-center justify-between">
          <div className="h-fit w-fit rounded-lg bg-hover text-white p-7 gap-x-10 py-5 flex justify-start items-center">
            <FaUserDoctor className="text-6xl" />
            <div className="flex justify-center items-center flex-col space-y-4">
              <p className="font-medium text-center text-4xl">{noOfDoctors}</p>
              <h1 className="font-light text-center text-base">Doctors</h1>
            </div>
          </div>
          <div className="h-fit w-fit rounded-lg bg-white text-hover p-7 gap-x-10 py-5 flex justify-start items-center">
            <GiArmBandage className="text-6xl" />
            <div className="flex justify-center items-center flex-col space-y-4">
              <p className="font-medium text-center text-4xl">{noOfPatients}</p>
              <h1 className="font-light text-center text-base">Patients</h1>
            </div>
          </div>
          <div className="h-fit w-fit rounded-lg bg-green-500 text-white p-7 gap-x-10 py-5 flex justify-start items-center">
            <SlGraph className="text-6xl" />
            <div className="flex justify-center items-center flex-col space-y-4">
              <p className="font-medium text-center text-4xl">
                {noOfAppointments}
              </p>
              <h1 className="font-light text-center text-base">Appointments</h1>
            </div>
          </div>
        </div>

        <div className="flex justify-evenly items-center gap-x-3">
          <div className="doctors rounded-lg bg-orange-500 w-72 text-white p-4 py-5 flex flex-row-reverse justify-center items-center gap-x-12">
            <LuAlarmClock className="text-3xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-3xl">
                {upcomingAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Upcoming</h1>
            </div>
          </div>
          <div className="doctors rounded-lg bg-emerald-500 w-72 text-white p-4 gap-y-6 py-5 flex flex-row-reverse justify-center items-center gap-x-12">
            <CgCalendarToday className="text-3xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-3xl">
                {todaysAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Today&apos;s</h1>
            </div>
          </div>
          <div className="doctors rounded-lg bg-red-500 w-72 text-white p-4 gap-y-6 py-5 flex flex-row-reverse justify-center items-center gap-x-12">
            <HiPhoneMissedCall className="text-3xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-3xl">
                {missedAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Missed</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-animateCard rounded-lg shadow-xl col-span-1 row-span-1 p-10 flex flex-col justify-center items-center gap-y-3">
        <h1 className="text-center text-xl font-medium">Quick actions</h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px blue] shadow-sm cursor-pointer bg-white text-green-500 p-3 items-center space-x-3">
            <LuAlarmClock />
            <span>Create new appointment</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-hover p-3 items-center space-x-3">
            <GiArmBandage />
            <span>Add new patient</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-orange-500 p-3 items-center space-x-3">
            <FaUserDoctor />
            <span>Add new doctor</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-black p-3 items-center space-x-3">
            <IoCalendar />
            <span>Update schedule</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-red-500 p-3 items-center space-x-3">
            <MdOutlineNotificationsActive />
            <span>Send notifications</span>
          </div>
        </div>
      </div>
      <div className="bg-animateCard rounded-lg shadow-xl col-span-1 row-span-1 h-[60vh] p-3 overflow-scroll overflow-x-hidden">
        <h1 className="text-center text-xl font-medium">Notifications</h1>
      </div>
      <div className="bg-animateCard rounded-lg shadow-xl col-span-3 row-span-2 h-[60vh] p-3 flex flex-col justify-start items-center pt-8 gap-y-16 overflow-scroll overflow-x-hidden">
        <h1 className="text-center text-xl font-medium">Charts</h1>
        <Bar options={chartOptions} data={chartData} />
        <Bar options={chartOptions} data={doctorsData} />
        <Bar options={chartOptions} data={patientsData} />
        <Pie options={chartOptions} data={patientsDataByAge} />
      </div>
    </div>
  );
};

export default AdminHero;
