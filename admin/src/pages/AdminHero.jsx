import {MdOutlineNotificationsActive} from 'react-icons/md';
import {FaCalendarDays} from 'react-icons/fa6';
import {LuAlarmClock} from 'react-icons/lu';
import {FaUserDoctor} from 'react-icons/fa6';
import {SlGraph} from 'react-icons/sl';
import {GiArmBandage} from 'react-icons/gi';
import {CgCalendarToday} from 'react-icons/cg';
import {useEffect, useState} from 'react';
import toast, {Toaster} from 'react-hot-toast';
import {HiPhoneMissedCall} from 'react-icons/hi';
import {Chart} from 'react-charts';

const AdminHero = () => {
  const [noOfDoctors, setDoctors] = useState (0);
  const [noOfPatients, setPatients] = useState (0);
  const [noOfAppointments, setAppointments] = useState (0);
  const [todaysAppointments, setTodaysAppointments] = useState (0);
  const [upcomingAppointments, setUpcomingAppointments] = useState (0);
  const [missedAppointments, setMissedAppointments] = useState (0);

  useEffect (() => {
    async function fetchDoctors () {
      const response = await fetch (
        'http://localhost:5750/api/doctors/fetchAllDoctors'
      );
      if (!response.ok) {
        toast.error ('Error fetching doctors');
      }

      const data = await response.json ();
      const availableDoctors = data.doctors;
      if (availableDoctors.length < 1) {
        toast.custom ('No Doctors found');
      }
      setDoctors (availableDoctors.length);
    }

    fetchDoctors ();
  }, []);

  useEffect (() => {
    async function fetchPatients () {
      const response = await fetch (
        'http://localhost:5750/api/patients/fetchAllPatients'
      );
      if (!response.ok) {
        toast.error ('Error fetching patients');
      }
      const data = await response.json ();
      const availablePatients = data.patients;
      if (availablePatients.length < 1) {
        toast.custom ('No patients found');
      }
      setPatients (availablePatients.length);
    }

    fetchPatients ();
  }, []);

  useEffect (() => {
    async function fetchAppointments () {
      const response = await fetch (
        'http://localhost:5750/api/admin/viewAllAppointments'
      );
      if (!response.ok) {
        toast.error ('Error fetching appointments');
      }

      const data = await response.json ();
      const availableAppointments = data.bookings;
      console.log (availableAppointments);

      if (availableAppointments.length < 1) {
        toast.custom ('No appointments found');
      }

      const today = new Date ();
      today.setHours (0, 0, 0, 0);

      setAppointments (availableAppointments.length);
      const appointmentsToday = availableAppointments.filter (
        eachAppointment =>
          new Date (eachAppointment.appointmentDate).getTime () ===
          today.getTime ()
      );
      setTodaysAppointments (appointmentsToday.length);

      const appointmentsMissed = availableAppointments.filter (
        eachAppointment =>
          new Date (eachAppointment.appointmentDate).getTime () <
          today.getTime ()
      );
      setMissedAppointments (appointmentsMissed.length);
      console.log (appointmentsMissed);

      const appointmentsComing = availableAppointments.filter (
        eachAppointment =>
          new Date (eachAppointment.appointmentDate).getTime () >
          today.getTime ()
      );
      setUpcomingAppointments (appointmentsComing.length);
      console.log (appointmentsComing);
    }

    fetchAppointments ();
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-3 p-8 gap-8">
      <Toaster position="top-left" />
      <div className="KPI bg-animateCard min-h-32 rounded-lg shadow-xl col-span-1 row-span-2 p-3">
        <h1 className="text-center text-xl font-medium">
          Key Performance Information
        </h1>
        <div className="doctors rounded-lg bg-hover text-white p-7 gap-x-10 py-5 m-5 flex justify-start items-center">
          <FaUserDoctor className="text-6xl" />
          <div className="flex justify-center items-center flex-col space-y-4">
            <p className="font-medium text-center text-4xl">{noOfDoctors}</p>
            <h1 className="font-light text-center text-base">Doctors</h1>
          </div>
        </div>
        <div className="doctors rounded-lg bg-white text-hover p-7 gap-x-10 py-5 m-5 flex justify-start items-center">
          <GiArmBandage className="text-6xl" />
          <div className="flex justify-center items-center flex-col space-y-4">
            <p className="font-medium text-center text-4xl">{noOfPatients}</p>
            <h1 className="font-light text-center text-base">Patients</h1>
          </div>
        </div>
        <div className="doctors rounded-lg bg-green-500 text-white p-7 gap-x-10 py-5 m-5 flex justify-start items-center">
          <SlGraph className="text-6xl" />
          <div className="flex justify-center items-center flex-col space-y-4">
            <p className="font-medium text-center text-4xl">
              {noOfAppointments}
            </p>
            <h1 className="font-light text-center text-base">Appointments</h1>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-3">
          <div className="doctors rounded-lg bg-orange-500 w-fit text-white p-4 gap-y-6 py-5 flex flex-col justify-start items-center">
            <LuAlarmClock className="text-2xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-xl">
                {upcomingAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Upcoming</h1>
            </div>
          </div>
          <div className="doctors rounded-lg bg-emerald-500 text-white p-4 gap-y-6 py-5 flex flex-col justify-start items-center">
            <CgCalendarToday className="text-2xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-xl">
                {todaysAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Today&apos;s</h1>
            </div>
          </div>
          <div className="doctors rounded-lg bg-red-500 text-white p-4 gap-y-6 py-5 flex flex-col justify-start items-center">
            <HiPhoneMissedCall className="text-2xl" />
            <div className="flex justify-center items-center flex-col space-y-2">
              <p className="font-medium text-center text-xl">
                {missedAppointments}
              </p>
              <h1 className="font-light text-center text-sm">Missed</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="charts bg-animateCard min-h-32 rounded-lg shadow-xl col-span-2 row-span-3 p-3">
        <h1 className="text-center text-xl font-medium">Charts</h1>
        <h1>Appointments</h1>
        <div
          style={{
            width: '400px',
            height: '300px',
          }}
        />
      </div>
      <div className="notifications bg-animateCard min-h-32 rounded-lg shadow-xl col-span-1 row-span-3 p-3">
        <h1 className="text-center text-xl font-medium">Notifications</h1>
      </div>
      <div className="QuickActions bg-animateCard min-h-32 rounded-lg shadow-xl col-span-1 row-span-1 p-3 flex flex-col justify-center items-center gap-y-3">
        <h1 className="text-center text-xl font-medium">Quick actions</h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px blue] shadow-sm cursor-pointer bg-white text-green-500 p-3 items-center space-x-3">
            <LuAlarmClock /><span>Create new appointment</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-hover p-3 items-center space-x-3">
            <GiArmBandage /><span>Add new patient</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-orange-500 p-3 items-center space-x-3">
            <FaUserDoctor /><span>Add new doctor</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-black p-3 items-center space-x-3">
            <FaCalendarDays /><span>Update schedule</span>
          </div>
          <div className="flex w-64 justify-start hover:shadow-[10px 10px 10px black] shadow-sm cursor-pointer bg-white text-red-500 p-3 items-center space-x-3">
            <MdOutlineNotificationsActive /><span>Send notifications</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminHero;
